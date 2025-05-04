import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AchievementsSection() {
  const { t } = useTranslation();
  const achievements = t('achievements.items', { returnObjects: true });

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('achievements.title')}</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        {achievements.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </section>
  );
}
