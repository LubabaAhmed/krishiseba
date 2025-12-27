
import React, { useState } from 'react';
import { User } from './types';
import { Auth } from './components/Auth';
import { CropAnalysis } from './components/CropAnalysis';
import { Forum } from './components/Forum';
import { EmergencyContacts } from './components/EmergencyContacts';
import { APP_NAME, UI_STRINGS } from './constants';

type Tab = 'dashboard' | 'analysis' | 'forum' | 'emergency';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  if (!user) {
    return (
      <div className="min-h-screen bg-green-50">
        <header className="bg-white shadow-sm py-4 mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">{APP_NAME}</h1>
            <p className="text-sm text-green-500">কৃষকের বিশ্বস্ত বন্ধু</p>
          </div>
        </header>
        <Auth onLogin={setUser} />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <button 
              onClick={() => setActiveTab('analysis')}
              className="bg-white p-10 rounded-3xl shadow-lg border-b-8 border-green-600 flex flex-col items-center hover:scale-105 transition transform"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">{UI_STRINGS.analyzeCrop}</span>
            </button>

            <button 
              onClick={() => setActiveTab('forum')}
              className="bg-white p-10 rounded-3xl shadow-lg border-b-8 border-blue-600 flex flex-col items-center hover:scale-105 transition transform"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">{UI_STRINGS.forum}</span>
            </button>

            <button 
              onClick={() => setActiveTab('emergency')}
              className="bg-white p-10 rounded-3xl shadow-lg border-b-8 border-red-600 flex flex-col items-center hover:scale-105 transition transform"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-800">{UI_STRINGS.emergency}</span>
            </button>
          </div>
        );
      case 'analysis':
        return <CropAnalysis />;
      case 'forum':
        return <Forum currentUser={user} />;
      case 'emergency':
        return <EmergencyContacts />;
    }
  };

  return (
    <div className="min-h-screen bg-green-50 pb-24">
      {/* Header */}
      <nav className="bg-green-600 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="bg-white p-1 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">{APP_NAME}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden sm:block text-sm font-medium">{user.name}</span>
            <button 
              onClick={() => setUser(null)}
              className="text-xs font-bold uppercase tracking-wider bg-green-700 px-3 py-1 rounded-md hover:bg-green-800"
            >
              {UI_STRINGS.logout}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {renderContent()}
      </main>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-6 shadow-2xl flex justify-around items-center z-50 sm:hidden">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">হোম</span>
        </button>
        <button 
          onClick={() => setActiveTab('analysis')}
          className={`flex flex-col items-center ${activeTab === 'analysis' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">পরীক্ষা</span>
        </button>
        <button 
          onClick={() => setActiveTab('forum')}
          className={`flex flex-col items-center ${activeTab === 'forum' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">ফোরাম</span>
        </button>
        <button 
          onClick={() => setActiveTab('emergency')}
          className={`flex flex-col items-center ${activeTab === 'emergency' ? 'text-green-600' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="text-[10px] mt-1 font-bold">জরুরি</span>
        </button>
      </div>
    </div>
  );
};

export default App;
