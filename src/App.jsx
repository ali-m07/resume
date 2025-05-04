import React, { useState } from 'react';
import './index.css';

import HeaderSection from './HeaderSection';
import AboutMeSection from './AboutMeSection';
import ContactSection from './ContactSection';
import ExperienceSection from './ExperienceSection';
import AchievementsSection from './AchievementsSection';
import SkillsSection from './SkillsSection';
import EducationSection from './EducationSection';
import ResearchSection from './ResearchSection';
import PublicationsSection from './PublicationsSection';
import ProjectSection from './ProjectSection';
import LanguagesSection from './LanguagesSection';
import LanguageToggleButton from './LanguageToggleButton';

function App() {
  const [language, setLanguage] = useState('en');

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <HeaderSection />

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Ali Mansouri</h1>
          <LanguageToggleButton language={language} setLanguage={setLanguage} />
        </div>

        <AboutMeSection language={language} />
        <ContactSection language={language} />
        <ExperienceSection language={language} />
        <AchievementsSection language={language} />
        <SkillsSection language={language} />
        <EducationSection language={language} />
        <ResearchSection language={language} />
        <PublicationsSection language={language} />
        <ProjectSection language={language} />
        <LanguagesSection language={language} />

      </div>
    </div>
  );
}

export default App;
