import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  whitelist: ['br', 'en'],
  debug: true,
  backend: {
    loadPath: '../public/i18n/{{lng}}/{{ns}}.json',
  },
  react: {
    wait: true,
  },
});

export default i18n;
