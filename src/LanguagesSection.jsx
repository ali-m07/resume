import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function LanguagesSection() {
  const { t } = useTranslation();
  const items = t('languages.items', { returnObjects: true }) || [];

  return (
    <Section id="languages" title={t('languages.title')}>
      <ul className="space-y-1.5">
        {items.map((item, idx) => (
          // Each item flows on its own line naturally (label muted, then value).
          // No flex/justify-between → no line breaking, RTL-safe.
          <li key={idx} className="text-[13.5px] leading-relaxed text-slate-700">
            <span className="font-semibold text-ink">{item.label}:</span>{' '}
            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
