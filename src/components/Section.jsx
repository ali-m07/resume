import React from 'react';

/**
 * Shared section wrapper for the light-body content area.
 * Renders a card with an editorial hairline-rule title.
 */
export default function Section({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`cv-card p-5 sm:p-6 ${className}`}>
      {title && (
        <h2 className="cv-section-title mb-4">{title}</h2>
      )}
      <div>{children}</div>
    </section>
  );
}
