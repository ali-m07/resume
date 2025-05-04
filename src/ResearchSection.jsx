import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ResearchSection() {
  const { t } = useTranslation();
  const researchList = t('research.items', { returnObjects: true });

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('research.title')}</h2>
      <ul className="space-y-4 text-gray-700">
        {researchList.map((item, i) => (
          <li key={i}>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.institution}</p>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
