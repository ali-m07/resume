import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlText from './components/RtlText';
import Section from './components/Section';

export default function ResearchSection() {
  const { t } = useTranslation();
  const researchList = t('research.items', { returnObjects: true }) || [];

  return (
    <Section id="research" title={t('research.title')}>
      <ul className="space-y-4">
        {researchList.map((item, i) => (
          <li key={i} className="cv-research-entry cv-atomic-block">
            <div className="cv-keep-with-next">
              <RtlText tag="h3" text={item.title} className="cv-role-title font-display text-sm font-semibold text-ink" />
            </div>
            <RtlText tag="p" text={item.institution} className="text-xs text-muted cv-text cv-prose-inline" />
            <RtlText tag="p" text={item.description} className="mt-1 text-[13px] leading-relaxed cv-text cv-prose-inline" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
