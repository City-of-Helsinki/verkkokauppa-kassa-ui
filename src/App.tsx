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
import { Footer } from "hds-react"
import useCookie from "./hooks/useCookie";
import CookieConsent from "react-cookie-consent";

export default function App() {
  const { i18n } = useTranslation();
  const [, updateCookie] = useCookie('_hjOptOut', false);
  /**
   * This code checks for use of a language code in the url that is not the
   * current one in storage or url. If found, it updates the storage value for language code.
   */
  const [langCode, update] = useSessionStorage(STORAGE_LANG_KEY);
  const currentLangCode = getSearchParam("lng");
  const previousLangCode = useRef("");

  useEffect(() => {
    if ((process.env.REACT_APP_IS_ANALYTICS || '') === '') {
      updateCookie('true', 30)
    }
  }, [])

  // Ensure that we use the correct language code.
  useEffect(() => {
    if (typeof langCode === "string" && previousLangCode.current !== langCode) {
      if (!currentLangCode) {
        // Set the correct language
        i18n.changeLanguage(langCode);
      } else if (i18n.language !== langCode) {
        // Goes here when language code was changed in the url and syncs it with stored value.
        update(i18n.language);
      }

      // And update the ref.
      previousLangCode.current = langCode;
    }
  }, [langCode, previousLangCode, currentLangCode, i18n, update]);

  return (
    <AppContextProvider>
      <Router>
        <div className="App">
          <HeaderNavigation />
          <Checkout />
          <Footer />
          <CookieConsent
            location="bottom"
            buttonText="Hyväksy kaikki evästeet"
            declineButtonText="Vain välttämättömät evästeet"
            cookieName="accept-cookie"
            style={{ background: "#2B373B" }}
            buttonStyle={{ background: "#ffda07", fontSize: "20px" }}
            declineButtonStyle={{ background: 'black', fontSize: "20px" }}
            declineButtonClasses={'decline-button'}
            buttonClasses={'accept-button'}
            buttonWrapperClasses={'footer-button-wrapper'}
            expires={150}
            enableDeclineButton
            debug
            flipButtons={true}
          >
            <h2>Hel.fi käyttää evästeitä</h2>
            Tämä sivusto käyttää välttämättömiä evästeitä suorituskyvyn varmistamiseksi sekä yleisen käytön seurantaan.{" "}
            Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja kohdistetun sisällön näyttämiseen.
            Jatkamalla sivuston käyttöä ilman asetusten muuttamista hyväksyt välttämättömien evästeiden käytön.
          </CookieConsent>
        </div>
      </Router>
    </AppContextProvider>
  );
}