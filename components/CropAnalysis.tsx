
import React, { useState, useRef } from 'react';
import { analyzeCropImage } from '../services/geminiService';
import { AnalysisResult } from '../types';
import { UI_STRINGS } from '../constants';

export const CropAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        processImage(base64String.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeCropImage(base64);
      setResult(data);
    } catch (error) {
      alert("বিশ্লেষণ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyStyles = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  // Helper to split solution string into steps
  const renderSolutionSteps = (solution: string) => {
    const steps = solution.split('\n').filter(step => step.trim().length > 0);
    return (
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start group">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm mr-3 mt-0.5 group-hover:bg-green-600 group-hover:text-white transition-colors">
              {index + 1}
            </span>
            <p className="text-gray-800 leading-relaxed pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-green-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">{UI_STRINGS.analyzeCrop}</h3>
          {result && (
            <button 
              onClick={() => {
                setResult(null);
                setImagePreview(null);
              }}
              className="text-sm font-semibold text-green-600 hover:text-green-700 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              আবার চেষ্টা করুন
            </button>
          )}
        </div>
        
        {!result && (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-4 border-dashed border-green-100 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-300 hover:bg-green-50/30 transition-all duration-300"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-72 rounded-2xl shadow-lg mb-6 ring-4 ring-white" />
            ) : (
              <div className="text-center group">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xl font-bold text-green-800 mb-2">{UI_STRINGS.uploadPhoto}</p>
                <p className="text-green-500 text-sm">ভালো ফলাফল পেতে পরিষ্কার ছবি তুলুন</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
        )}

        {loading && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.4503-.35L2.395 7.553a1 1 0 00-.35 1.45l5.35 8.35a1 1 0 001.45.35l8.35-5.35a1 1 0 00.35-1.45l-5.35-8.35z" />
                </svg>
              </div>
            </div>
            <p className="text-xl font-bold text-green-700 animate-pulse">{UI_STRINGS.analyzing}</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Left Column: Image & Basic Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl overflow-hidden shadow-md group">
                <img src={imagePreview!} alt="Crop" className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-sm font-black border-2 shadow-sm ${getUrgencyStyles(result.urgency)}`}>
                  {UI_STRINGS.urgencyTitle}: {result.urgency}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="text-2xl font-black text-gray-900 mb-3 leading-tight">{result.problemName}</h4>
                <div className="flex items-start space-x-2 text-gray-600">
                  <svg className="w-5 h-5 mt-1 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm leading-relaxed">{result.description}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Solution */}
            <div className="lg:col-span-7">
              <div className="bg-emerald-50/50 p-8 rounded-3xl border border-emerald-100 relative overflow-hidden h-full">
                {/* Decorative background element */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
                
                <h5 className="text-emerald-900 font-black text-xl mb-8 flex items-center relative z-10">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-emerald-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  {UI_STRINGS.solutionTitle}
                </h5>
                
                <div className="relative z-10">
                  {renderSolutionSteps(result.solution)}
                </div>

                <div className="mt-10 pt-6 border-t border-emerald-100 flex items-center justify-between text-emerald-800 text-sm font-bold relative z-10">
                  <p>বিশেষজ্ঞের পরামর্শে প্রস্তুত</p>
                  <button className="flex items-center space-x-1 hover:text-emerald-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>শেয়ার করুন</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Tips Section */}
      {!loading && !result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'ভালো আলো', text: 'ছবি তোলার সময় পর্যাপ্ত আলো নিশ্চিত করুন যাতে সমস্যাটি স্পষ্ট বোঝা যায়।', icon: '💡' },
            { title: 'কাছ থেকে ছবি', text: 'আক্রান্ত অংশের একটি পরিষ্কার ক্লোজ-আপ ছবি দিন।', icon: '🔍' },
            { title: 'অপেক্ষা করুন', text: 'আমাদের AI আপনার ফসল পরীক্ষা করতে কয়েক সেকেন্ড সময় নিতে পারে।', icon: '⏱️' }
          ].map((tip, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-green-50 flex items-start space-x-4">
              <span className="text-3xl">{tip.icon}</span>
              <div>
                <h6 className="font-bold text-gray-900 mb-1">{tip.title}</h6>
                <p className="text-sm text-gray-500 leading-relaxed">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
