import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './index.css';

import Hero from './Hero';
import AboutMeSection from './AboutMeSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import ResearchSection from './ResearchSection';
import PublicationsSection from './PublicationsSection';
import ProjectSection from './ProjectSection';
import LanguagesSection from './LanguagesSection';
import { normalizeLanguageCode } from './lib/languages';
import { getInitialTheme, applyTheme, toggleTheme } from './lib/theme';
import { applyDocumentDirection } from './lib/rtl';

function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(() => normalizeLanguageCode(i18n.language));
  const [theme, setTheme] = useState(getInitialTheme);
  const isRTL = language === 'fa';

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyDocumentDirection(language);
  }, [language]);

  useEffect(() => {
    const onLanguageChanged = (lng) => setLanguage(normalizeLanguageCode(lng));
    i18n.on('languageChanged', onLanguageChanged);
    return () => i18n.off('languageChanged', onLanguageChanged);
  }, [i18n]);

  useEffect(() => {
    const normalized = normalizeLanguageCode(i18n.language);
    if (normalized !== i18n.language) {
      i18n.changeLanguage(normalized);
    }
  }, [i18n]);

  const handleSetLanguage = useCallback((lang) => {
    const code = normalizeLanguageCode(lang);
    i18n.changeLanguage(code);
    setLanguage(code);
  }, [i18n]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => toggleTheme(prev));
  }, []);

  return (
    <div className={`min-h-screen bg-canvas font-sans text-ink transition-colors duration-200 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* resume-root wraps BOTH hero and body so the header is captured in PDF exports */}
      <div
        id="resume-root"
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-6 ${isRTL ? 'rtl fa-section' : 'ltr'}`}
      >
        <Hero
          language={language}
          setLanguage={handleSetLanguage}
          isRTL={isRTL}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Resume body */}
        <main className="space-y-6">
          <AboutMeSection />

          {/* Two-column layout: main (Experience + Projects) | aside (Skills, Languages, Education, Research, Publications).
              Print: collapses to single column (handled in index.css .cv-layout) */}
          <div
            className="cv-layout grid grid-cols-1 lg:grid-cols-5 gap-6 items-start"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="lg:col-span-3 space-y-6">
              <ExperienceSection />
              <ProjectSection />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <EducationSection />
              <SkillsSection />
              <LanguagesSection />
              <ResearchSection />
              <PublicationsSection />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted pt-2 pb-6 no-print">
            Ali Mansouri · Solutions Architect · {language.toUpperCase()}
          </p>
        </main>
      </div>
    </div>
  );
}

export default App;
