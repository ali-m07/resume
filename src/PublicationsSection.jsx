import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Section from './components/Section';

export default function PublicationsSection() {
  const { t } = useTranslation();
  const [showAllConfs, setShowAllConfs] = useState(false);

  const journals = t('publications.journals.items', { returnObjects: true }) || [];
  const conferences = t('publications.conferences.items', { returnObjects: true }) || [];
  const books = t('publications.books.items', { returnObjects: true }) || [];

  const ConfsToShow = showAllConfs ? conferences : conferences.slice(0, 2);

  return (
    <Section id="publications" title={t('publications.title')}>
      {/* Journal Articles */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2">{t('publications.journals.title')}</h3>
        <ul className="space-y-1.5">
          {journals.map((art, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-slate-700 cv-avoid-break">
              <span className="italic">{art.title}</span>
              {art.status && <span className="text-muted"> ({art.status})</span>}
              {art.doi && (
                <a href={art.doi} target="_blank" rel="noopener noreferrer" className="cv-link ml-1">[DOI]</a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Conference Papers */}
      <div className="mb-5">
        <h3 className="text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2">{t('publications.conferencesTitle')}</h3>
        <ul className="space-y-1.5">
          {ConfsToShow.map((conf, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-slate-700 cv-avoid-break">
              <span className="italic">{conf.title}</span>, <span className="text-muted">{conf.event}</span>
              {conf.link && (
                <a href={conf.link} target="_blank" rel="noopener noreferrer" className="cv-link ml-1">[Link]</a>
              )}
            </li>
          ))}
        </ul>
        {conferences.length > 2 && (
          <button onClick={() => setShowAllConfs(!showAllConfs)} className="mt-2 text-xs cv-link no-print">
            {showAllConfs ? t('publications.showLess') : t('publications.showMore')}
          </button>
        )}
      </div>

      {/* Books */}
      <div>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2">{t('publications.books.title')}</h3>
        <ul className="space-y-1.5">
          {books.map((bk, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-slate-700 cv-avoid-break">
              <span className="italic">{bk.title}</span>, <span className="text-muted">{bk.details}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
