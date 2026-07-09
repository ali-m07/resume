import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlHtml from './components/RtlHtml';
import RtlText from './components/RtlText';
import Section from './components/Section';

export default function AboutMeSection() {
  const { t } = useTranslation();
  const pillars = t('aboutMe.pillars', { returnObjects: true }) || [];

  return (
    <Section id="summary" title={t('aboutMe.title')}>
      <RtlHtml
        tag="p"
        html={t('aboutMe.text')}
        className="text-[15px] leading-relaxed cv-text cv-prose cv-atomic-block"
      />

      {pillars.length > 0 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 pdf-compact-hide">
          {pillars.map((p, i) => (
            <div key={i} className="cv-pillar-card cv-avoid-break">
              <RtlText tag="h3" text={p.title} className="font-display text-sm font-semibold text-ink mb-1" />
              <RtlHtml
                tag="p"
                html={p.text}
                className="text-[13px] leading-relaxed cv-text cv-prose-inline cv-text-muted"
              />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
