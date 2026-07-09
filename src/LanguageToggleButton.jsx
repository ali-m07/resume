import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n';
import { SUPPORTED_LANGUAGES } from './lib/languages';

export default function LanguageToggleButton({ language, setLanguage, dark = false }) {
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuPos, setMenuPos] = useState(null);
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);
  const isRTL = language === 'fa';
  const current = SUPPORTED_LANGUAGES.find((l) => l.code === language) ?? SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (!showDropdown) return;
    const handler = (e) => {
      const inButton = wrapperRef.current?.contains(e.target);
      const inMenu = menuRef.current?.contains(e.target);
      if (!inButton && !inMenu) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showDropdown]);

  useEffect(() => {
    if (!showDropdown || !wrapperRef.current) {
      setMenuPos(null);
      return;
    }

    const updatePosition = () => {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + 10,
        left: isRTL ? rect.left : undefined,
        right: isRTL ? undefined : window.innerWidth - rect.right,
        minWidth: Math.max(rect.width, 240),
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [showDropdown, isRTL]);

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setShowDropdown(false);
  };

  const triggerClass = dark
    ? 'border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30'
    : 'border-line bg-card text-ink hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm';

  const dropdown = showDropdown && menuPos
    ? createPortal(
        <>
          <div
            className="fixed inset-0 z-[9998] bg-slate-900/20 backdrop-blur-[2px] no-print cv-lang-backdrop"
            onClick={() => setShowDropdown(false)}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            className={`cv-lang-menu fixed z-[9999] overflow-hidden rounded-2xl border shadow-2xl animate-lang-menu-in ${
              isRTL ? 'text-right' : 'text-left'
            }`}
            style={{
              top: menuPos.top,
              left: menuPos.left,
              right: menuPos.right,
              minWidth: menuPos.minWidth,
            }}
            role="listbox"
            aria-label={t('hero.languageMenu')}
          >
            <div className="flex items-center gap-2 border-b border-line/80 px-4 py-3 bg-slate-50/80 dark:bg-slate-800/80">
              <Globe2 className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                {t('hero.languageMenu')}
              </span>
            </div>
            <div className="p-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const selected = lang.code === language;
                return (
                  <button
                    type="button"
                    key={lang.code}
                    role="option"
                    aria-selected={selected}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      selected
                        ? 'bg-accent/10 text-ink font-semibold ring-1 ring-accent/25'
                        : 'text-ink/90 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    } ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
                    onClick={() => handleChange(lang.code)}
                  >
                    <span className="text-lg leading-none w-7 text-center shrink-0" aria-hidden="true">
                      {lang.flag}
                    </span>
                    <span className="flex-1 min-w-0 truncate">{lang.label}</span>
                    {selected && (
                      <Check className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div ref={wrapperRef} className="relative inline-block text-left no-print">
      <button
        type="button"
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${triggerClass} ${
          showDropdown ? 'ring-2 ring-accent/30' : ''
        }`}
        onClick={() => setShowDropdown((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={showDropdown}
        aria-label={t('hero.languageMenu')}
      >
        <span className="text-base leading-none" aria-hidden="true">{current.flag}</span>
        <span className="truncate max-w-[6.5rem] whitespace-nowrap">{current.label}</span>
        <ChevronDown
          className={`w-4 h-4 opacity-70 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
        />
      </button>
      {dropdown}
    </div>
  );
}
