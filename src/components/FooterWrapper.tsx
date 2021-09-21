import { useTranslation } from "react-i18next";
import React from "react";
import { Footer } from "hds-react";

export function FooterWrapper() {
  const { t,i18n } = useTranslation();
  let footerLinks = [];

  footerLinks.push([ 'https://www.hel.fi/static/talpa/verkkokauppa-alustan-rekisteriseloste.pdf', t('footer.terms-url') ])

  return <Footer title="checkout.hel.fi">
    <Footer.Navigation>
      { footerLinks.map((data) => (
        <Footer.Item key={ data[0] } href={ data[0] } onClick={ (e: { preventDefault: () => void; }) => {
          e.preventDefault()
          window.open(data[0])
        } } label={ data[1] }/>
      ))
      }

      <Footer.Item key={ 'serviceUrl' } target={'_blank'} href={`/${i18n.language || 'fi'}/information` } onClick={ (e: { preventDefault: () => void; }) => {

      } } label={ t('footer.service-url')}/>

      <Footer.Item key={ 'cookieHubOpen' } href={ '#' } onClick={ (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        (window as any).cookiehub.openSettings()
      } } label={ t('footer.cookie-hub') }/>

    </Footer.Navigation>
    <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved"/>
  </Footer>;
}