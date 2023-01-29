import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import login from './login';
import general from './general';
import error from './error';
import signup from './signup';
import userProfile from './userProfile';
import calendar from './calendar';

const resources = {
  en: {
    general: general.en,
    login: login.en,
    signup: signup.en,
    userProfile: userProfile.en,
    calendar: calendar.en,
    error: error.en,
  },
  fr: {
    general: general.fr,
    login: login.fr,
    signup: signup.fr,
    userProfile: userProfile.fr,
    calendar: calendar.fr,
    error: error.fr,
  },
};

const langMatch = window.location.search.match(/lang=([a-z]{2})/) || ['', null];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    lng: (
      window.location.host.startsWith('en')
    || langMatch[1] === 'en'
    ) ? 'en' : undefined,
  });

export default i18n;
