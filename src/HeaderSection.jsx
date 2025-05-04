import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HeaderSection() {
  const { t } = useTranslation();

  return (
    <header className="text-center mt-10 mb-8">
      <h1 className="text-4xl font-extrabold text-gray-900">Ali Mansouri</h1>
      <p className="mt-2 text-xl text-gray-700">
        {t('header.subtitle')}
      </p>
      <p className="mt-1 text-md text-gray-600">
        {t('header.description')}
      </p>
    </header>
  );
}
