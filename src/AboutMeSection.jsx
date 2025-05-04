import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AboutMeSection() {
  const { t } = useTranslation();

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('aboutMe.title')}</h2>
      <p className="text-gray-700 leading-relaxed text-justify">
        {t('aboutMe.text')}
      </p>
    </section>
  );
}