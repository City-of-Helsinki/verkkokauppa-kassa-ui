import React, { useEffect, useRef } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { useTranslation } from "react-i18next"

import AppContextProvider from "./context/Appcontext"
import "./App.scss"
import { useSessionStorage } from "./hooks/general/useStorage"
import { STORAGE_LANG_KEY } from "./TranslationConstants"
import { getSearchParam } from "./hooks/general/useSearchParam"
import { HeaderNavigation } from "./components/layout/header/HeaderNavigation"
import { Checkout } from "./components/Checkout"
import { FooterWrapper } from "./components/layout/footer/FooterWrapper"
import CookieHub from "./components/layout/head/CookieHub"
import { CookieBanner, CookieConsentContextProvider, CookieConsentReactProps } from "hds-react-next"
import { commonSiteSettings } from "./components/cookieConsent/commonSiteSettings"

export default function App() {
  const { i18n } = useTranslation()

  /**
   * This code checks for use of a language code in the url that is not the
   * current one in storage or url. If found, it updates the storage value for language code.
   */
  const [ langCode, update ] = useSessionStorage(STORAGE_LANG_KEY)
  const currentLangCode = getSearchParam("lang")
  const previousLangCode = useRef("")

  // Ensure that we use the correct language code.
  useEffect(() => {
    if (typeof langCode === "string" && previousLangCode.current !== langCode) {
      if (!currentLangCode) {
        // Set the correct language
        i18n.changeLanguage(langCode)
      } else if (i18n.language !== langCode) {
        // Goes here when language code was changed in the url and syncs it with stored value.
        update(i18n.language)
        i18n.changeLanguage(currentLangCode)
      }

      // And update the ref.
      previousLangCode.current = langCode
    }
  }, [ langCode, previousLangCode, currentLangCode, i18n, update ])

  const onChange: CookieConsentReactProps["onChange"] = (event) => {
    console.log("consent event", event)
  }

  const siteSettings = {}

  return (

    <AppContextProvider>
      <CookieConsentContextProvider
        onChange={onChange}
        // focusing the logo link, because the tab component loses focus on re-render.
        options={{ language: langCode || 'fi' }}
        siteSettings={{ ...commonSiteSettings }}
      >
        {/*<CookieHub/>*/}
        <CookieBanner />
        <Router>
          <div className="App">
            <HeaderNavigation />
            <Checkout />
            <FooterWrapper />
          </div>
        </Router>
      </CookieConsentContextProvider>
    </AppContextProvider>
  )
}