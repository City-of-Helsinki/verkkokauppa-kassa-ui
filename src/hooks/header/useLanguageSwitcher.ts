import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import { useSessionStorage } from "../general/useStorage";
import { Language } from "../../types/header/languageSwitcher/types";
import {
  STORAGE_LANG_KEY,
} from "../../TranslationConstants";

function useLanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const [, update] = useSessionStorage(STORAGE_LANG_KEY);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    if (currentLanguage !== i18n.language) {
      setCurrentLanguage(i18n.language);
    }
  }, [i18n.language, currentLanguage]);

  const languageOptions = React.useMemo(() => {
    const languageLabels = {
      fi: t('common.language.fi.label'),
      sv: t('common.language.sv.label'),
      en: t('common.language.en.label')
    };

    return Object.values(Language).map(language => ({
      label: languageLabels[language],
      value: language
    }));
  }, [t]);

  const currentLangAsOptions = languageOptions.filter(
    (option) => option.value === currentLanguage
  );
  const currentLangAsOption =
    currentLangAsOptions.length > 0 ? currentLangAsOptions[0] : undefined;

  const handleSwitchLanguage = useCallback(
    async (langCode: Language) => {

      // If the language is not present in available languages, do nothing.
      if (!languageOptions.find((item) => item.value === langCode)) return;
      console.log("Language :" + langCode)

      // Persist language code into storage.
      await i18n.changeLanguage(langCode);
      update(langCode);

      // Handle updating the URL.
      let url = new URL(window.location.href);

      // If the current language code is in the url, replace it with the new one.
      if (url.searchParams.has("lang")) {
        url.searchParams.set("lang", langCode);
      } else {
        url.searchParams.append("lang", langCode);
      }

      history.push({
        pathname: location.pathname,
        search: url.searchParams.toString(),
      });
      // Updates cookie dialog language
      window.location.reload()
    },
    [history, languageOptions, i18n, update, location]
  );

  return {
    languageOptions,
    currentLanguage,
    currentLangAsOption,
    handleSwitchLanguage,
    setCurrentLanguage,
  };
}

export default useLanguageSwitcher;
