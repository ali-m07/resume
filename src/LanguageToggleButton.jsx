import React, { useState } from 'react';
import i18n from './i18n'; // ⚠️ مطمئن شو که این مسیر درسته

export default function LanguageToggleButton({ language, setLanguage }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);     // ✅ این خط خیلی مهمه
    setLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center space-x-2 px-3 py-2 bg-white border rounded-lg shadow hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src={language === 'en' ? '/flags/en.png' : language === 'de' ? '/flags/de.png' : '/flags/tr.png'}
          alt="flag"
          className="w-5 h-5 rounded-full object-cover"
        />
        <span className="text-sm">{language === 'en' ? 'English' : language === 'de' ? 'Deutsch' : 'Türkçe'}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-10">
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100"
            onClick={() => handleChange('en')}
          >
            <img src="/flags/en.png" alt="UK" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-sm">English</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100"
            onClick={() => handleChange('de')}
          >
            <img src="/flags/de.png" alt="Germany" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-sm">Deutsch</span>
          </button>
          <button
            className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100"
            onClick={() => handleChange('tr')}
          >
            <img src="/flags/tr.png" alt="Turkey" className="w-5 h-5 rounded-full object-cover" />
            <span className="text-sm">Türkçe</span>
          </button>
        </div>
      )}
    </div>
  );
}
