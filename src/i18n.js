// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { SUPPORTED_LANG_CODES } from './lib/languages';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANG_CODES,
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}.json`
    },
    interpolation: { escapeValue: false }
  });

export default i18n;
