import { useTranslation } from "react-i18next";
import React from "react";
import { Footer } from "hds-react";

export function FooterWrapper() {
  const { t } = useTranslation();
  let footerLinks = [];

  footerLinks.push([ 'https://www.hel.fi/static/talpa/verkkokauppa-alustan-rekisteriseloste.pdf', t('footer.terms-url') ])

  return <Footer>
    <Footer.Navigation>
      { footerLinks.map((data) => (
        <Footer.Item key={ data[0] } href={ data[0] } onClick={ (e: { preventDefault: () => void; }) => {
          e.preventDefault()
          window.open(data[0])
        } } label={ data[1] }/>
      ))
      }
    </Footer.Navigation>
  </Footer>;
}