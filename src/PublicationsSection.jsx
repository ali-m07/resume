import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RtlText from './components/RtlText';
import { isRtlLanguage } from './lib/rtl';
import Section from './components/Section';

function PubText({ text, className }) {
  const { i18n } = useTranslation();
  const rtl = isRtlLanguage(i18n.language);

  if (rtl) {
    return <RtlText tag="span" text={text} className={className} />;
  }

  return <span className={className}>{text}</span>;
}

export default function PublicationsSection() {
  const { t, i18n } = useTranslation();
  const [showAllConfs, setShowAllConfs] = useState(false);

  const journals = t('publications.journals.items', { returnObjects: true }) || [];
  const conferences = t('publications.conferences.items', { returnObjects: true }) || [];
  const books = t('publications.books.items', { returnObjects: true }) || [];

  const ConfsToShow = showAllConfs ? conferences : conferences.slice(0, 2);

  return (
    <Section id="publications" title={t('publications.title')} key={i18n.language}>
      <div className="mb-5">
        <div className="cv-keep-with-next">
          <PubText
            text={t('publications.journals.title')}
            className="cv-subsection-title text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2 block"
          />
        </div>
        <ul className="space-y-1.5">
          {journals.map((art, i) => (
            <li key={`${i18n.language}-j-${i}`} className="text-[13px] leading-relaxed cv-text cv-atomic-block">
              {art.doi ? (
                <a
                  href={art.doi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-link italic cv-prose-inline"
                >
                  <PubText text={art.title} />
                </a>
              ) : (
                <PubText text={art.title} className="italic cv-prose-inline" />
              )}
              {art.status && (
                <>
                  {' '}
                  <PubText text={`(${art.status})`} className="text-muted cv-prose-inline" />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-5">
        <div className="cv-keep-with-next">
          <PubText
            text={t('publications.conferencesTitle')}
            className="cv-subsection-title text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2 block"
          />
        </div>
        <ul className="space-y-1.5">
          {ConfsToShow.map((conf, i) => (
            <li key={`${i18n.language}-c-${i}`} className="text-[13px] leading-relaxed cv-text cv-atomic-block">
              {conf.link ? (
                <a
                  href={conf.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cv-link italic cv-prose-inline"
                >
                  <PubText text={conf.title} />
                </a>
              ) : (
                <PubText text={conf.title} className="italic cv-prose-inline" />
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

      <div>
        <div className="cv-keep-with-next">
          <PubText
            text={t('publications.books.title')}
            className="cv-subsection-title text-xs font-semibold tracking-wide uppercase text-accent-600 mb-2 block"
          />
        </div>
        <ul className="space-y-1.5">
          {books.map((bk, i) => (
            <li key={`${i18n.language}-b-${i}`} className="text-[13px] leading-relaxed cv-text cv-atomic-block">
              <PubText text={bk.title} className="italic cv-prose-inline" />
              {', '}
              <PubText text={bk.details} className="text-muted cv-prose-inline" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
