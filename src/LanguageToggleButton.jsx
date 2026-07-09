import React, { useState, useRef, useEffect } from 'react';
import i18n from './i18n';

const LANGS = ['en', 'de', 'fr', 'tr', 'fa'];

export default function LanguageToggleButton({ language, setLanguage, dark = false }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);
  const isRTL = language === 'fa';

  // Close on outside click (robust, independent of an overlay swallowing clicks)
  useEffect(() => {
    if (!showDropdown) return;
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDropdown]);

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
      case 'fr': return 'Français';
      case 'tr': return 'Türkçe';
      case 'fa': return 'فارسی';
      default: return '🌐';
    }
  };

  return (
    <div ref={wrapperRef} className="relative inline-block text-left no-print">
      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition ${
          dark
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
            : 'border-line bg-card text-slate-700 hover:bg-slate-50 shadow-sm'
        }`}
        onClick={() => setShowDropdown((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
      >
        <img src={getFlagPath(language)} alt="" className="w-5 h-5 rounded-full object-cover" />
        <span className="truncate max-w-[6rem] whitespace-nowrap">{getLanguageLabel(language)}</span>
        <svg className={`w-3.5 h-3.5 opacity-70 transition-transform ${showDropdown ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
      </button>

      {showDropdown && (
        <div
          className={`absolute z-50 mt-2 w-48 bg-card border border-line rounded-lg shadow-card overflow-hidden ${isRTL ? 'left-0' : 'right-0'}`}
          role="listbox"
        >
          {LANGS.map((lang) => (
            <button
              type="button"
              key={lang}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-slate-50 transition text-left ${
                lang === language ? 'bg-slate-50 font-semibold' : ''
              }`}
              onClick={() => handleChange(lang)}
            >
              <img src={getFlagPath(lang)} alt="" className="w-5 h-5 rounded-full object-cover" />
              <span className="flex-1 text-slate-700">{getLanguageLabel(lang)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
