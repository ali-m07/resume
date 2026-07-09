import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlHtml from './components/RtlHtml';
import RtlText from './components/RtlText';
import Section from './components/Section';

export default function ProjectSection() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) || [];

  return (
    <Section id="projects" title={t('projects.title')}>
      <ul className="space-y-4">
        {projects.map((proj, i) => (
          <li key={i} className="cv-project-entry cv-atomic-block border-s-2 border-accent/40 ps-3">
            <div className="cv-keep-with-next">
              <RtlText tag="h3" text={proj.title} className="cv-role-title font-display text-sm font-semibold text-ink" />
            </div>
            <RtlHtml
              tag="p"
              html={proj.description}
              className="mt-1 text-[13.5px] leading-relaxed cv-text cv-prose"
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
