import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('experience.title')}</h2>
      <ul className="space-y-4 text-gray-700">

        {/* Snapp! - People Analytics Specialist */}
        <li>
          <h3 className="font-semibold text-lg">{t('experience.snapp.title')}</h3>
          <p className="text-sm text-gray-500">{t('experience.snapp.location')}</p>
          <ul className="list-disc ml-6 mt-1 text-justify">
            {t('experience.snapp.points', { returnObjects: true }).map((point, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
          </ul>
        </li>

        {/* Bodyspinner - People Analytics Specialist (Part-Time) */}
        <li>
          <h3 className="font-semibold text-lg">{t('experience.bodyspinner.title')}</h3>
          <p className="text-sm text-gray-500">{t('experience.bodyspinner.location')}</p>
          <ul className="list-disc ml-6 mt-1 text-justify">
            {t('experience.bodyspinner.points', { returnObjects: true }).map((point, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
          </ul>
        </li>

        {/* Arsh - HR Digital Transformation Specialist */}
        <li>
          <h3 className="font-semibold text-lg">{t('experience.arsh.title')}</h3>
          <p className="text-sm text-gray-500">{t('experience.arsh.location')}</p>
          <ul className="list-disc ml-6 mt-1 text-justify">
            {t('experience.arsh.points', { returnObjects: true }).map((point, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
          </ul>
        </li>

        {/* KarenCrowd - Business Evaluator */}
        <li>
          <h3 className="font-semibold text-lg">{t('experience.karencrowd.title')}</h3>
          <p className="text-sm text-gray-500">{t('experience.karencrowd.location')}</p>
          <ul className="list-disc ml-6 mt-1 text-justify">
            {t('experience.karencrowd.points', { returnObjects: true }).map((point, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
            ))}
          </ul>
        </li>

      </ul>
    </section>
  );
}
