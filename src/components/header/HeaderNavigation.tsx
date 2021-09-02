import {Navigation} from "hds-react"
import LanguageSwitcher from "./LanguageSwitcher"
import React from "react"
import {useTranslation} from "react-i18next"
import {Cart} from "./Cart"

export const HeaderNavigation = () => {
  const { t, i18n } = useTranslation();

  return (
    <Navigation
      title={t("common.page-title")}
      menuToggleAriaLabel="menu"
      skipTo="#checkout-container"
      skipToContentLabel={t("steps.skip-to-content")}
    >
      <Navigation.Actions>
        <LanguageSwitcher />
      </Navigation.Actions>
    </Navigation>
  )
}