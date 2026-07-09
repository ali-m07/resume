import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function ResearchSection() {
  const { t } = useTranslation();
  const researchList = t('research.items', { returnObjects: true }) || [];

  return (
    <Section id="research" title={t('research.title')}>
      <ul className="space-y-4">
        {researchList.map((item, i) => (
          <li key={i} className="cv-avoid-break">
            <h3 className="font-display text-sm font-semibold text-ink">{item.title}</h3>
            <p className="text-xs text-muted">{item.institution}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-700">{item.description}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
