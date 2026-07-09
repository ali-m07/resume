import React from 'react';
import { useTranslation } from 'react-i18next';
import { localizeHtml, localizeText } from '../lib/bidi';
import { isRtlLanguage } from '../lib/rtl';

/**
 * Plain text with LTR token isolation for mixed RTL/LTR strings.
 * Locale strings must be plain text — no manual <bdi> tags.
 */
export default function RtlText({ text, className, tag: Tag = 'span', ...rest }) {
  const { i18n } = useTranslation();
  const rtl = isRtlLanguage(i18n.language);

  if (rtl) {
    const content = localizeText(text, i18n.language);
    return (
      <Tag
        className={className}
        dir="rtl"
        lang="fa"
        dangerouslySetInnerHTML={{ __html: content }}
        {...rest}
      />
    );
  }

  return (
    <Tag className={className} {...rest}>
      {text}
    </Tag>
  );
}
