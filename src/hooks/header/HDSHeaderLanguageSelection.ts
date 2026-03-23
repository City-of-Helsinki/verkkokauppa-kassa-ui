// KYV-1329 Language selection and switching for next HDS Header
import i18n from "i18next"

export enum Language {
  FI = 'fi',
  SV = 'sv',
  EN = 'en'
}

export const changeLanguage = (lang: Language) => {
  i18n.changeLanguage(lang);

  localStorage.setItem('lang', lang);
  window.location.reload();
};
