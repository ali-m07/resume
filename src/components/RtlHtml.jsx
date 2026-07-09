import React from 'react';
import { useTranslation } from 'react-i18next';
import { localizeHtml } from '../lib/bidi';
import { isRtlLanguage } from '../lib/rtl';

/**
 * Locale HTML (<b>, <i> only) with automatic LTR isolation when RTL is active.
 * Never embed <bdi> in locale JSON — bidi.js generates isolation at runtime.
 */
export default function RtlHtml({ html, className, tag: Tag = 'span', ...rest }) {
  const { i18n } = useTranslation();
  const rtl = isRtlLanguage(i18n.language);
  const content = localizeHtml(html, i18n.language);

  return (
    <Tag
      className={className}
      dir={rtl ? 'rtl' : undefined}
      lang={rtl ? 'fa' : undefined}
      dangerouslySetInnerHTML={{ __html: content }}
      {...rest}
    />
  );
}
