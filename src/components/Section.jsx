import React from 'react';
import { useTranslation } from 'react-i18next';
import RtlText from './RtlText';

/**
 * Shared section wrapper for the light-body content area.
 * Renders a card with an editorial hairline-rule title.
 */
export default function Section({ id, title, children, className = '', breakable = true }) {
  return (
      <section
        id={id}
        className={`cv-card cv-section cv-section-flow p-5 sm:p-6 ${breakable ? 'cv-section-breakable' : ''} ${className}`}
      >
      {title && (
        <div className="cv-keep-with-next mb-4">
          <RtlText tag="h2" text={title} className="cv-section-title" />
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
