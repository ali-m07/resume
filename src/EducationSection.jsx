import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlText from './components/RtlText';
import Section from './components/Section';

export default function EducationSection() {
  const { t } = useTranslation();
  const degrees = t('education.degrees', { returnObjects: true }) || [];

  return (
    <Section id="education" title={t('education.title')}>
      <ul className="space-y-4">
        {degrees.map((deg, i) => (
          <li key={i} className="cv-education-entry cv-atomic-block">
            <div className="cv-keep-with-next">
              <RtlText tag="h3" text={deg.title} className="cv-role-title font-medium text-[15px] text-ink leading-snug" />
            </div>
            <RtlText tag="p" text={deg.institution} className="text-xs text-muted mt-0.5 cv-text cv-prose-inline" />
            {deg.description && (
              <RtlText tag="p" text={deg.description} className="text-xs text-muted italic mt-0.5 cv-text cv-prose-inline" />
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
