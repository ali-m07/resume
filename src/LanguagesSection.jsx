import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguagesSection() {
  const { t } = useTranslation();
  const items = t('languages.items', { returnObjects: true });

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('languages.title')}</h2>
      <ul className="space-y-3 text-gray-700">
        {items.map((item, idx) => (
          <li key={idx}>
            <span className="font-semibold">{item.label}</span> {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
}
