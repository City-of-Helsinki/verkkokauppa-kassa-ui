import 'react-i18next';
import en from './i18n/en.json';
import fi from './i18n/fi.json';
import sv from './i18n/sv.json';

declare module 'react-i18next' {
  interface Resources   {
    en: typeof en,
    fi: typeof fi,
    sv: typeof sv,
  }
}