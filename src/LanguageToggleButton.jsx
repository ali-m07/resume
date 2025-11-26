import React, { useState } from 'react';
import i18n from './i18n';

export default function LanguageToggleButton({ language, setLanguage }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setShowDropdown(false);
  };

  const getFlagPath = (lang) => `${import.meta.env.BASE_URL}flags/${lang}.png`;

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case 'en': return 'English';
      case 'de': return 'Deutsch';
      case 'tr': return 'Türkçe';
      case 'fr': return 'French';
      case 'fa': return 'فارسی';
      default: return '🌐';
    }
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center space-x-2 px-3 py-2 bg-white border rounded-lg shadow hover:bg-gray-100"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <img
          src={getFlagPath(language)}
          alt="flag"
          className="w-5 h-5 rounded-full object-cover"
        />
        <span className="text-sm">{getLanguageLabel(language)}</span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-10">
          {['en', 'de', 'tr', 'fr', 'fa'].map((lang) => (
            <button
              key={lang}
              className="flex items-center space-x-2 w-full px-3 py-2 hover:bg-gray-100"
              onClick={() => handleChange(lang)}
            >
              <img
                src={getFlagPath(lang)}
                alt={lang}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-sm">{getLanguageLabel(lang)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}