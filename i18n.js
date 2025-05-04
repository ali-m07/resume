import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Load translations via HTTP (from public folder)
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'de', 'tr', 'fa'],
    debug: false,

    backend: {
      loadPath: '/locales/{{lng}}.json',
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
