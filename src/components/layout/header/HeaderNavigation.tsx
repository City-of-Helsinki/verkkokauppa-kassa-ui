import React from "react"
import { useTranslation } from "react-i18next"
import { Header as HDSHeader, Logo, logoFi, LogoSize, logoSv } from "hds-react-next"
import useLanguageSwitcher from "../../../hooks/header/useLanguageSwitcher";
import { Language } from "../../../types/header/languageSwitcher/types"

export const HeaderNavigation = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const {
    languageOptions,
    handleSwitchLanguage
  } = useLanguageSwitcher();

  document.title = t('common.page-title');

    return (
      <HDSHeader
        className="hide-on-print"
        theme={'light'}
        onDidChangeLanguage={lang => handleSwitchLanguage(lang as Language)}
        languages={languageOptions}
        defaultLanguage={i18n.language}>
        <HDSHeader.ActionBar
          title={t("common.page-title")}
          titleHref="/"
          logoHref="/"
          frontPageLabel={t("common.page-title")}
          logo={
            <Logo
              src={i18n.language === 'sv' ? logoSv : logoFi}
              alt={t('navigation.logo')}
              size={LogoSize.Full}
            />
          }
          menuButtonAriaLabel={t('navigation.menuToggleAriaLabel')}>
          <HDSHeader.LanguageSelector ariaLabel={i18n.language.toUpperCase()} />
          <hr aria-hidden="true" />
        </HDSHeader.ActionBar>
      </HDSHeader>
    );

}

export default HeaderNavigation;