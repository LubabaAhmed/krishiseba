
import React from 'react';
import { EMERGENCY_CONTACTS, UI_STRINGS } from '../constants';

export const EmergencyContacts: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{UI_STRINGS.emergency}</h3>
      <div className="space-y-4">
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between border-l-4 border-red-500">
            <div>
              <h4 className="text-lg font-bold text-gray-900">{contact.name}</h4>
              <p className="text-sm text-gray-500">{contact.designation}</p>
              <p className="text-xs text-gray-400 mt-1">{contact.location}</p>
            </div>
            <a 
              href={`tel:${contact.number}`}
              className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3 rounded-2xl flex items-center font-bold transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {contact.number}
            </a>
          </div>
        ))}
      </div>
      
      <div className="mt-10 p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
        <h4 className="font-bold text-yellow-800 mb-2">জরুরি পরামর্শ</h4>
        <p className="text-yellow-700 text-sm leading-relaxed">
          আপনার ফসলের বড় কোন ক্ষতি নজরে এলে দ্রুত স্থানীয় কৃষি কর্মকর্তার সাথে যোগাযোগ করুন। মাঠ পর্যায়ে সহায়তার জন্য ১৬১২৩ নম্বরে ফ্রি কল করুন।
        </p>
      </div>
    </div>
  );
};
