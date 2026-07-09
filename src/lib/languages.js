/** Single source of truth for supported UI / PDF locales. */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
];

export const SUPPORTED_LANG_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

export function normalizeLanguageCode(lng) {
  const code = (lng || 'en').split('-')[0].toLowerCase();
  return SUPPORTED_LANG_CODES.includes(code) ? code : 'en';
}

export function getLanguageMeta(code) {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) ?? SUPPORTED_LANGUAGES[0];
}
