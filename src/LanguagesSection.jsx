import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlText from './components/RtlText';
import Section from './components/Section';

export default function LanguagesSection() {
  const { t } = useTranslation();
  const items = t('languages.items', { returnObjects: true }) || [];

  return (
    <Section id="languages" title={t('languages.title')}>
      <ul className="space-y-1.5">
        {items.map((item, idx) => (
          <li key={idx} className="text-[13.5px] leading-relaxed cv-text cv-atomic-block">
            <span className="font-semibold text-ink">{item.label}:</span>{' '}
            <RtlText tag="span" text={item.value} className="cv-prose-inline" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
