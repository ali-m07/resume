import React, { useState } from 'react';
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

function App() {
  const [language, setLanguage] = useState('en');
  const isRTL = language === 'fa';

  return (
    <div className={`min-h-screen bg-canvas font-sans text-ink ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* resume-root wraps BOTH hero and body so the header is captured in PDF exports */}
      <div id="resume-root" className="mx-auto max-w-5xl px-4 py-6 sm:py-10 space-y-6">
        {/* Hero: dark gradient header with controls + identity + metrics + contacts */}
        <Hero language={language} setLanguage={setLanguage} isRTL={isRTL} />

        {/* Resume body */}
        <main className="space-y-6">
          <AboutMeSection />

          {/* Two-column layout: main (Experience + Projects) | aside (Skills, Languages, Education, Research, Publications).
              Print: collapses to single column (handled in index.css .cv-layout) */}
          <div className="cv-layout grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-3 space-y-6">
              <ExperienceSection />
              <ProjectSection />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <SkillsSection />
              <LanguagesSection />
              <EducationSection />
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
