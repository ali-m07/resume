import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SkillsSection() {
  const { t } = useTranslation();

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('skills.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div>
          <h3 className="font-semibold text-lg mb-1">{t('skills.technical.title')}</h3>
          <ul className="list-disc list-inside ml-2">
            {t('skills.technical.items', { returnObjects: true }).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{t('skills.business.title')}</h3>
          <ul className="list-disc list-inside ml-2">
            {t('skills.business.items', { returnObjects: true }).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
