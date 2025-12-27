
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{UI_STRINGS.analyzeCrop}</h3>
        
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-4 border-dashed border-green-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-400 transition"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="max-h-64 rounded-lg shadow-sm mb-4" />
          ) : (
            <div className="text-center">
              <svg className="w-16 h-16 text-green-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-gray-500 font-medium">{UI_STRINGS.uploadPhoto}</p>
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

        {loading && (
          <div className="mt-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-2"></div>
            <p className="text-green-700 animate-pulse">{UI_STRINGS.analyzing}</p>
          </div>
        )}

        {result && !loading && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="border-l-4 border-green-600 pl-4 py-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${getUrgencyColor(result.urgency)}`}>
                {UI_STRINGS.urgencyTitle}: {result.urgency}
              </span>
              <h4 className="text-2xl font-bold text-gray-900">{result.problemName}</h4>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-gray-700 leading-relaxed">{result.description}</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h5 className="text-green-800 font-bold text-lg mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {UI_STRINGS.solutionTitle}
              </h5>
              <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {result.solution}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
