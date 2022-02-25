import { useTranslation } from "react-i18next";
import React from "react";
import { Footer } from "hds-react";

export function FooterWrapper() {
  const { t } = useTranslation();
  let footerLinks = [];
  footerLinks.push([ 'https://www.hel.fi/static/talpa/verkkokauppa-alustan-rekisteriseloste.pdf', t('footer.terms-url') ])

  return <Footer title="checkout.hel.fi" className="checkout-footer">
    <Footer.Navigation>
      { footerLinks.map((data) => (
        <Footer.Item key={ data[0] } href={ data[0] } onClick={ (e: { preventDefault: () => void; }) => {
          e.preventDefault()
          window.open(data[0])
        } } label={ data[1] }/>
      ))
      }

      <Footer.Item key={ 'cookieHubOpen' } href={ '#' } onClick={ (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        (window as any).cookiehub.openSettings()
      } } label={ t('footer.cookie-hub') }/>

      <Footer.Item target={'_blank'} className={'footer-service-url'} key={ 'support-service-url' } label={t('footer.service-url') } href={`/fi/information`}/>
      <Footer.Item target={'_blank'} key={ 'support-email' } label={t('footer.support.header') } href={`/fi/information#article2`}/>
    </Footer.Navigation>
    <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved"/>
  </Footer>;
}