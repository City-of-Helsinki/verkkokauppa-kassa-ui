import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AppContextProvider from "./context/Appcontext";
import "./App.scss";
import { useSessionStorage } from "./hooks/useStorage";
import { STORAGE_LANG_KEY } from "./TranslationConstants";
import { getSearchParam } from "./hooks/useSearchParam";
import { HeaderNavigation } from "./components/header/HeaderNavigation"
import { Checkout } from "./components/Checkout"
import { FooterWrapper } from "./components/FooterWrapper";
import CookieHub from "./components/head/CookieHub";
import { Helmet } from "react-helmet";
import { hotjar } from 'react-hotjar';
export default function App() {
  const { i18n } = useTranslation();

  /**
   * This code checks for use of a language code in the url that is not the
   * current one in storage or url. If found, it updates the storage value for language code.
   */
  const [langCode, update] = useSessionStorage(STORAGE_LANG_KEY);
  const currentLangCode = getSearchParam("lang");
  const previousLangCode = useRef("");

  // Ensure that we use the correct language code.
  useEffect(() => {
    if (typeof langCode === "string" && previousLangCode.current !== langCode) {
      if (!currentLangCode) {
        // Set the correct language
        i18n.changeLanguage(langCode);
      } else if (i18n.language !== langCode) {
        // Goes here when language code was changed in the url and syncs it with stored value.
        update(i18n.language);
        i18n.changeLanguage(currentLangCode);
      }

      // And update the ref.
      previousLangCode.current = langCode;
    }
  }, [langCode, previousLangCode, currentLangCode, i18n, update]);

  const handleInit = () => {
    console.log('hotjar init');
    hotjar.initialize(2559937,6)
  }

  useEffect(() => {
    window.addEventListener('hotjar_init', handleInit);

    return () => {
      window.removeEventListener('hotjar_init', handleInit);
    };
  }, []);

  return (
    <AppContextProvider>
      <CookieHub />
      <Router>
        <div className="App">
          <HeaderNavigation/>
          <Checkout/>
          <FooterWrapper />
        </div>
      </Router>
    </AppContextProvider>
  );
}