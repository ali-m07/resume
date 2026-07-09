import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function EducationSection() {
  const { t } = useTranslation();
  const degrees = t('education.degrees', { returnObjects: true }) || [];

  return (
    <Section id="education" title={t('education.title')}>
      <ul className="space-y-4">
        {degrees.map((deg, i) => (
          <li key={i} className="cv-avoid-break">
            <h3 className="font-medium text-[15px] text-ink leading-snug">{deg.title}</h3>
            <p className="text-xs text-muted mt-0.5">{deg.institution}</p>
            {deg.description && (
              <p className="text-xs text-slate-500 italic mt-0.5">{deg.description}</p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
