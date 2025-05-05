import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PublicationsSection() {
  const { t } = useTranslation();
  const [showAllConfs, setShowAllConfs] = useState(false);

  // Liste aus JSON laden
  const journals = t('publications.journals.items', { returnObjects: true }) || [];
  const conferences = t('publications.conferences.items', { returnObjects: true }) || [];
  const books = t('publications.books.items', { returnObjects: true }) || [];

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('publications.title')}</h2>

      {/* Journal Articles */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">{t('publications.journals.title')}</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          {journals.map((art, i) => (
            <li key={i}>
              <i>{art.title}</i>
              {art.status && ` (${art.status})`}
              {art.doi && (
                <a
                  href={art.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >[DOI]</a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Conference Papers */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg">{t('publications.conferencesTitle')}</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          {(showAllConfs ? conferences : conferences.slice(0, 2)).map((conf, i) => (
            <li key={i}>
              <strong>{conf.authors}</strong>: <i>{conf.title}</i> — {conf.event}
              {conf.link && (
                <a
                  href={conf.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >[Link]</a>
              )}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowAllConfs(!showAllConfs)}
          className="mt-2 text-blue-600 hover:underline"
        >
          {showAllConfs ? t('publications.showLess') : t('publications.showMore')}
        </button>
      </div>

      {/* Books */}
      <div>
        <h3 className="font-semibold text-lg">{t('publications.books.title')}</h3>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          {books.map((bk, i) => (
            <li key={i}>
              <i>{bk.title}</i> — {bk.details}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
