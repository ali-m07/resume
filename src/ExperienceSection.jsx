import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('experience.title')}</h2>
      <ul className="space-y-4 text-gray-700">

        {/* Snapp! – one company block, multiple positions (LinkedIn style) */}
        <li>
          <h3 className="font-semibold text-lg">{t('experience.snapp.company')}</h3>
          <p className="text-sm text-gray-500 mb-3">{t('experience.snapp.location')}</p>
          {t('experience.snapp.positions', { returnObjects: true }).map((pos, posIdx) => (
            <div key={posIdx} className={posIdx > 0 ? 'mt-4' : ''}>
              <p className="font-medium text-gray-800">{pos.title}</p>
              <p className="text-sm text-gray-500 mb-1">{pos.period}</p>
              <ul className="list-disc ml-6 mt-1 text-justify">
                {pos.points.map((point, idx) => (
                  <li key={idx} dangerouslySetInnerHTML={{ __html: point }}></li>
                ))}
              </ul>
            </div>
          ))}
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

        {/* Shahrzad - HR Digital Transformation Specialist */}
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
