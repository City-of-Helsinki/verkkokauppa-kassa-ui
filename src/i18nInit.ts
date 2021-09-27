import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './i18n/en.json';
import fi from './i18n/fi.json';
import sv from './i18n/sv.json';
import {SUPPORT_LANGUAGES} from './TranslationConstants';

function initI18next() {
    i18n
        .use(new LanguageDetector({},{lookupQuerystring: 'lang',}))
        .use(initReactI18next)
        .init({
            detection: {
                order: [
                    'querystring',
                    'sessionStorage'
                ],
            },
            fallbackLng: 'fi',
            preload: ['fi', 'sv', 'en'],
            interpolation: {
                escapeValue: false,
            },
            whitelist: [
                SUPPORT_LANGUAGES.EN,
                SUPPORT_LANGUAGES.FI,
                SUPPORT_LANGUAGES.SV,
            ],
            resources: {
                en: {
                    translation: en,
                },
                fi: {
                    translation: fi,
                },
                sv: {
                    translation: sv,
                },
            }
        });
}

initI18next();

export default i18n;