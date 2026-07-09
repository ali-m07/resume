import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function SkillsSection() {
  const { t } = useTranslation();
  const groups = t('skills.groups', { returnObjects: true }) || [];

  return (
    <Section id="skills" title={t('skills.title')}>
      <div className="space-y-4">
        {groups.map((group, gi) => (
          <div key={gi} className="cv-avoid-break">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2">{group.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item, i) => (
                <span key={i} className="cv-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
