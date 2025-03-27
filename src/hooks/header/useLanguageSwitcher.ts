import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import { useSessionStorage } from "../general/useStorage";
import { Option } from "../../types/header/languageSwitcher/types";
import {
  STORAGE_LANG_KEY,
  SUPPORT_LANGUAGES,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  // TODO: load available languages from server?
  const availableLanguages = new Array<Option>(
    {
      label: t("common.language.fi.code-uppercase"),
      value: SUPPORT_LANGUAGES.FI,
    },
    {
      label: t("common.language.sv.code-uppercase"),
      value: SUPPORT_LANGUAGES.SV,
    },
    {
      label: t("common.language.en.code-uppercase"),
      value: SUPPORT_LANGUAGES.EN,
    }
  );

  const currentLangAsOptions = availableLanguages.filter(
    (option) => option.value === currentLanguage
  );
  const currentLangAsOption =
    currentLangAsOptions.length > 0 ? currentLangAsOptions[0] : undefined;

  const handleSwitchLanguage = useCallback(
    async (selectedItem: Option) => {
      const langCode = selectedItem.value;

      // If the language is not present in available languages, do nothing.
      if (!availableLanguages.find((item) => item.value === langCode)) return;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [history, availableLanguages]
  );

  return {
    availableLanguages,
    currentLanguage,
    currentLangAsOption,
    handleSwitchLanguage,
    setCurrentLanguage,
  };
}

export default useLanguageSwitcher;
