import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PublicationsSection() {
  const { t } = useTranslation();
  const [showAllConferences, setShowAllConferences] = useState(false);

  const conferenceArticles = [
    {
      authors: "Mansouri, A., & Fathi, Y.",
      title: t("publications.conferences.0.title"),
      event: t("publications.conferences.0.event")
    },
    {
      authors: "Mansouri, A., Toozandjani, M. R., & Pazouki, A.",
      title: t("publications.conferences.1.title"),
      event: t("publications.conferences.1.event"),
      link: "https://en.civilica.com/doc/2060255/"
    },
    {
      authors: "Mansouri, A., Toozandjani, M. R., & Marzban, H.",
      title: t("publications.conferences.2.title"),
      event: t("publications.conferences.2.event"),
      link: "https://en.civilica.com/doc/2045012/"
    },
    {
      authors: "Mansouri, A., Karbalaei Mohammadhossein, S., & Toozandjani, M. R.",
      title: t("publications.conferences.3.title"),
      event: t("publications.conferences.3.event"),
      link: "https://en.civilica.com/doc/2045011/"
    },
    {
      authors: "Toozandjani, M. R., & Mansouri, A.",
      title: t("publications.conferences.4.title"),
      event: t("publications.conferences.4.event"),
      link: "https://en.civilica.com/doc/2006091/"
    },
    {
      authors: "Mansouri, A., Khaleghi, A., & Jafari Nia, S.",
      title: t("publications.conferences.5.title"),
      event: t("publications.conferences.5.event"),
      link: "https://en.civilica.com/doc/1754192/"
    }
  ];

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">{t('publications.title')}</h2>

      <div className="space-y-6 text-gray-700 text-justify">
        {/* Journal Articles */}
        <div>
          <h3 className="font-semibold text-lg">{t('publications.journals.title')}</h3>
          <ul className="list-disc list-outside pl-6 mt-1 space-y-1">
            <li>
              Mansouri, A., Khaleghi, A., & Jafari Nia, S. (2024).
              <i> {t('publications.journals.0.title')} </i>
              <a
                href="https://doi.org/10.22104/jtdm.2024.6558.3236"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                [DOI]
              </a>
            </li>
            <li>
              Khaleghi, A., Botelho, T., Salajegheh, N., & Mansouri, A.
              <i> {t('publications.journals.1.title')} </i>
              ({t('publications.journals.1.status')})
            </li>
            <li>
              Fathi, Y., Mansouri, A., & Toozandjani, M. R.
              <i> {t('publications.journals.2.title')} </i>
              ({t('publications.journals.2.status')})
            </li>
            <li>
              Khaleghi, A., Khastar, H., Darabpour, K., & Mansouri, A.
              <i> {t('publications.journals.3.title')} </i>
              <a
                href="https://doi.org/10.22111/innoeco.2025.50192.1130"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline ml-1"
              >
                [DOI]
              </a>
            </li>
          </ul>
        </div>

        {/* Conference Articles */}
        <div>
          <h3 className="font-semibold text-lg mt-6">{t('publications.conferencesTitle')}</h3>
          <ul className="list-disc list-outside pl-6 mt-1 space-y-1">
            {(showAllConferences ? conferenceArticles : conferenceArticles.slice(0, 2)).map((conf, index) => (
              <li key={index}>
                {conf.authors} <i>{conf.title}</i> {conf.event}
                {conf.link && (
                  <a
                    href={conf.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    [Civilica]
                  </a>
                )}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAllConferences(!showAllConferences)}
            className="mt-3 text-blue-600 hover:underline"
          >
            {showAllConferences ? t('publications.showLess') : t('publications.showMore')}
          </button>
        </div>

        {/* Books */}
        <div>
          <h3 className="font-semibold text-lg mt-6">{t('publications.books.title')}</h3>
          <ul className="list-disc list-outside pl-6 mt-1 space-y-1">
            <li>
              <i>{t('publications.books.0.title')}</i>
              {t('publications.books.0.details')}
            </li>
            <li>
              <i>{t('publications.books.1.title')}</i>
              {t('publications.books.1.details')}
            </li>
            <li>
              <i>{t('publications.books.2.title')}</i>
              {t('publications.books.2.details')}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
