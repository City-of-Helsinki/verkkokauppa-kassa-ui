import React from "react"
import { useTranslation } from "react-i18next"
import { Header as HDSHeader, Logo, logoFi, LogoSize, logoSv } from "hds-react-next"
import { changeLanguage, Language } from "../../../hooks/header/HDSHeaderLanguageSelection"

export const HeaderNavigation = () => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

    const title = t('common.page-title');

    document.title = title;

    const languageOptions = React.useMemo(() => {
      const languageLabels = {
        fi: 'Suomi',
        en: 'English',
        sv: 'Svenska'
      };

      return Object.values(Language).map(language => ({
        label: languageLabels[language],
        value: language
      }));
    }, []);

    return (
      <HDSHeader
        className="hide-on-print"
        theme={'light'}
        onDidChangeLanguage={lang => changeLanguage(lang as Language)}
        languages={languageOptions}
        defaultLanguage={i18n.language}>
        {/*<HDSHeader.SkipLink*/}
        {/*  skipTo="#content"*/}
        {/*  label={t('common:skip-to-content-label')}*/}
        {/*/>*/}
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
          {/*<WithAuthentication*/}
          {/*  AuthorisedComponent={LoggedInActionBarItem}*/}
          {/*  UnauthorisedComponent={UnauthorisedActionBarItem}*/}
          {/*/>*/}
        </HDSHeader.ActionBar>
      </HDSHeader>
    );




  // return (
  //   <Navigation
  //     title={t("common.page-title")}
  //     menuToggleAriaLabel="menu"
  //     skipTo="#checkout-container"
  //     skipToContentLabel={t("steps.skip-to-content-label")}
  //     titleAriaLabel={t("common.page-title")}
  //   >
  //     <Navigation.Actions>
  //       <LanguageSwitcher />
  //     </Navigation.Actions>
  //   </Navigation>
  // )
}

export default HeaderNavigation;