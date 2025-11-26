import React from 'react';
import { useTranslation } from 'react-i18next';

export default function HeaderSection() {
  const { t } = useTranslation();

  return (
    <div className="text-left">
      <h1 className="text-3xl font-bold text-gray-900">Ali Mansouri</h1>
      <p className="mt-1 text-lg text-gray-700">
        {t('header.subtitle')}
      </p>
      <p className="mt-1 text-sm text-gray-600">
        {t('header.description')}
      </p>
    </div>
  );
}
