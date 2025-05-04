import React from 'react';
import { useTranslation } from 'react-i18next';

export default function EducationSection() {
  const { t } = useTranslation();

  const degrees = t('education.degrees', { returnObjects: true });

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('education.title')}</h2>
      <ul className="space-y-4 text-gray-700">
        {degrees.map((deg, i) => (
          <li key={i}>
            <h3 className="font-semibold text-lg">{deg.title}</h3>
            <p className="text-sm text-gray-500">{deg.institution}</p>
            {deg.description && (
              <p className="text-sm text-gray-500 italic">{deg.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
