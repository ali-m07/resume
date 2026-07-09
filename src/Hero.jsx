import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github, BookOpen, Search } from 'lucide-react';
import LanguageToggleButton from './LanguageToggleButton';
import ThemeToggleButton from './ThemeToggleButton';
import ExportPDFButton from './ExportPDFButton';
import RtlText from './components/RtlText';
import { CONTACT_LINKS } from './lib/contactLinks';

export default function Hero({ language, setLanguage, isRTL, theme, onToggleTheme }) {
  const { t } = useTranslation();

  const iconByKey = {
    email: Mail,
    linkedin: Linkedin,
    github: Github,
    researchgate: BookOpen,
    scholar: Search,
  };

  const contacts = CONTACT_LINKS.map((link) => ({
    ...link,
    icon: iconByKey[link.key],
    label: link.key === 'email' ? link.label : (t(`contact.${link.key}`, { defaultValue: link.label })),
  }));

  return (
    <header className="print-hero relative rounded-2xl bg-navy-900 text-white shadow-hero overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ambient gradient — clipped inside rounded card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-90"
           style={{ background: 'radial-gradient(900px 280px at 10% -20%, rgba(59,130,246,0.28), transparent 60%), radial-gradient(700px 240px at 100% 0%, rgba(37,99,235,0.20), transparent 55%)' }} />
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-[0.05]"
           style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Compact padding — roughly half the height of the previous version */}
      <div className="relative px-4 py-4 sm:px-6 sm:py-5">
        {/* top-right controls */}
        <div className={`flex flex-wrap items-center gap-2 mb-3 no-print ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <ThemeToggleButton theme={theme} onToggle={onToggleTheme} variant="hero" />
          <LanguageToggleButton language={language} setLanguage={setLanguage} dark />
          <ExportPDFButton variant="hero" />
        </div>

        {/* Identity row: name+title left, contacts+location right (stacks on mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className={`cv-hero-name text-2xl sm:text-3xl font-bold leading-tight ${isRTL ? '' : 'font-display tracking-tight'}`}>
              {t('hero.name')}
            </h1>
            <p className="mt-0.5 text-sm sm:text-base font-medium text-slate-100">
              {t('hero.title')}
            </p>
            <RtlText
              tag="p"
              text={t('hero.tagline')}
              className="mt-0.5 text-xs text-slate-400 cv-hero-tagline"
            />
          </div>

          {/* contacts */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <a key={c.key} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                   className="inline-flex items-center gap-1 hover:text-white transition-colors whitespace-nowrap">
                  <Icon className="w-3.5 h-3.5 text-accent-400 flex-shrink-0" />
                  <span>{c.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* availability badge */}
        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t('hero.location')}
        </div>
      </div>
    </header>
  );
}
