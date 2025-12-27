
import React, { useState } from 'react';
import { UI_STRINGS } from '../constants';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      // Direct login without OTP as requested
      onLogin({ 
        id: Date.now().toString(), 
        name: name.trim(), 
        phone: phone.trim() 
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-t-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">
          {UI_STRINGS.loginTitle}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">{UI_STRINGS.nameLabel}</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="নাম লিখুন"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">{UI_STRINGS.phoneLabel}</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="০১৭XXXXXXXX"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
          >
            {UI_STRINGS.loginBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
