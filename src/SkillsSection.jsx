import React from 'react';
import { useTranslation } from 'react-i18next';
import { isRtlLanguage } from './lib/rtl';
import RtlText from './components/RtlText';
import Section from './components/Section';

/** Skill chips: plain text + dir only — never run bidi HTML injection on tags. */
function SkillTag({ label }) {
  const { i18n } = useTranslation();
  const rtl = isRtlLanguage(i18n.language);
  const hasLatin = /[A-Za-z]/.test(label);

  return (
    <span className="cv-tag" dir={rtl && hasLatin ? 'ltr' : rtl ? 'rtl' : 'ltr'} lang={hasLatin ? 'en' : undefined}>
      {label}
    </span>
  );
}

export default function SkillsSection() {
  const { t } = useTranslation();
  const groups = t('skills.groups', { returnObjects: true }) || [];

  return (
    <Section id="skills" title={t('skills.title')}>
      <div className="space-y-4">
        {groups.map((group, gi) => (
          <div key={gi} className="cv-skill-group cv-atomic-block">
            <div className="cv-keep-with-next">
              <RtlText tag="h3" text={group.title} className="cv-subsection-title text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item, i) => (
                <SkillTag key={i} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
