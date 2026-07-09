import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github, BookOpen, Search, Download } from 'lucide-react';
import LanguageToggleButton from './LanguageToggleButton';
import ExportPDFButton from './ExportPDFButton';

export default function Hero({ language, setLanguage, isRTL }) {
  const { t } = useTranslation();
  const metrics = t('hero.metrics', { returnObjects: true }) || [];

  const contacts = [
    { icon: Mail, href: 'mailto:ali.mansouri1998@gmail.com', label: 'ali.mansouri1998@gmail.com', key: 'email' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ali-mansouri-a7984215b/', label: 'LinkedIn', key: 'linkedin' },
    { icon: Github, href: 'https://github.com/ali-m07', label: 'GitHub', key: 'github' },
    { icon: BookOpen, href: 'https://www.researchgate.net/profile/Ali-Mansouri-44', label: 'ResearchGate', key: 'researchgate' },
    { icon: Search, href: 'https://scholar.google.com/citations?user=YOUR_GOOGLE_SCHOLAR_ID', label: 'Scholar', key: 'scholar' },
  ];

  return (
    <header className="print-hero relative rounded-2xl bg-navy-900 text-white shadow-hero">
      {/* ambient gradient + grid — clipped via inner wrapper, NOT the header, so the language dropdown is never clipped */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-90"
           style={{ background: 'radial-gradient(1100px 380px at 12% -10%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(900px 320px at 100% 0%, rgba(37,99,235,0.22), transparent 55%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]"
           style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }} />

      <div className="relative px-6 pt-7 pb-6 sm:px-9 sm:pt-9">
        {/* top-right controls */}
        <div className={`flex flex-wrap items-center gap-3 mb-6 no-print ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <LanguageToggleButton language={language} setLanguage={setLanguage} dark />
          <ExportPDFButton variant="hero" />
        </div>

        {/* identity */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.25em] text-accent-400 uppercase mb-2">Solutions Architect</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
            {t('hero.name')}
          </h1>
          <p className="mt-2 text-lg sm:text-xl font-medium text-slate-100">
            {t('hero.title')}
          </p>
          <p className="mt-1 font-mono text-sm text-slate-300">{t('hero.tagline')}</p>

          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            {t('hero.manifesto')}
          </p>
        </div>

        {/* metric pills */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
          {metrics.map((m, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <div className="font-display text-xl font-semibold text-white">{m.value}</div>
              <div className="text-[11px] uppercase tracking-wide text-slate-400 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* contacts + location */}
        <div className={`mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {contacts.map((c) => {
            const Icon = c.icon;
            return (
              <a key={c.key} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <Icon className="w-4 h-4 text-accent-400" />
                <span className="hidden sm:inline">{c.label}</span>
              </a>
            );
          })}
        </div>

        <div className={`mt-3 inline-flex items-center gap-2 text-xs text-slate-400 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {t('hero.location')}
        </div>
      </div>
    </header>
  );
}
