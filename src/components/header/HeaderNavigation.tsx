import { Navigation } from "hds-react"
import LanguageSwitcher from "./LanguageSwitcher"
import React from "react"
import { useTranslation } from "react-i18next"
import { IconUser} from "hds-react";
import authService from '../../auth/authService';

export const HeaderNavigation = () => {
  const { t } = useTranslation();

  return (
    <Navigation
      title={t("common.page-title")}
      menuToggleAriaLabel="menu"
      skipTo="#checkout-container"
      skipToContentLabel={t("steps.skip-to-content-label")}
      titleAriaLabel={t("common.page-title")}
    >
      <Navigation.Actions>
        <LanguageSwitcher />
      </Navigation.Actions>
    </Navigation>
  )
}