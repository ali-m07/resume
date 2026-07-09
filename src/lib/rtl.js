/** @typedef {'en'|'de'|'fr'|'tr'|'fa'} LangCode */

const RTL_LANGUAGES = new Set(['fa', 'ar', 'he', 'ur']);

export function isRtlLanguage(lang) {
  if (!lang) return false;
  return RTL_LANGUAGES.has(String(lang).split('-')[0].toLowerCase());
}

/** Sync `<html lang dir>` with active locale (web + PDF clone). */
export function applyDocumentDirection(lang) {
  const code = String(lang || 'en').split('-')[0].toLowerCase();
  const rtl = isRtlLanguage(code);
  document.documentElement.lang = code;
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
}
