import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ProjectSection() {
  const { t } = useTranslation();
  const projects = t('projects.items', { returnObjects: true });

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('projects.title')}</h2>
      <ul className="space-y-6 text-gray-700">
        {projects.map((proj, i) => (
          <li key={i}>
            <h3 className="font-semibold text-lg">{proj.title}</h3>
            <p className="text-justify">{proj.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
