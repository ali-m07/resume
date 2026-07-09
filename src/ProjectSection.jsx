import React from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function ProjectSection() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) || [];

  return (
    <Section id="projects" title={t('projects.title')}>
      <ul className="space-y-4">
        {projects.map((proj, i) => (
          <li key={i} className="cv-avoid-break border-l-2 border-accent/40 pl-3">
            <h3 className="font-display text-sm font-semibold text-ink">{proj.title}</h3>
            <p
              className="mt-1 text-[13.5px] leading-relaxed text-slate-700 text-justify"
              dangerouslySetInnerHTML={{ __html: proj.description }}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
