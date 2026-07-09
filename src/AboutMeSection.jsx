import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function AboutMeSection() {
  const { t } = useTranslation();
  const pillars = t('aboutMe.pillars', { returnObjects: true }) || [];

  return (
    <Section id="summary" title={t('aboutMe.title')}>
      <p
        className="text-[15px] leading-relaxed text-slate-700 text-justify"
        dangerouslySetInnerHTML={{ __html: t('aboutMe.text') }}
      />

      {pillars.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pillars.map((p, i) => (
            <div key={i} className="rounded-xl border border-line bg-slate-50/60 p-4 cv-avoid-break">
              <h3 className="font-display text-sm font-semibold text-ink mb-1">{p.title}</h3>
              <p className="text-[13px] leading-relaxed text-slate-600">{p.text}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
