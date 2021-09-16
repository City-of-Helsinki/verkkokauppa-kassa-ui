import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import { AppContext } from "../context/Appcontext";
import { Footer } from "hds-react";

export function FooterWrapper() {
  const { t } = useTranslation();
  const { merchantTermsOfServiceUrl } = useContext(AppContext);
  let footerLinks = [];
  if (merchantTermsOfServiceUrl !== "") {
    footerLinks.push([ merchantTermsOfServiceUrl, t('footer.terms-url') ])
  }
  return <Footer title="checkout.hel.fi">
    <Footer.Navigation>
      { footerLinks.map((data) => (
        <Footer.Item key={ data[0] } href={ data[0] } onClick={ (e: { preventDefault: () => void; }) => {
          e.preventDefault()
          window.open(data[0])
        } } label={ data[1] }/>
      ))
      }
      <Footer.Base copyrightHolder="Copyright" copyrightText="All rights reserved"></Footer.Base>
    </Footer.Navigation>
  </Footer>;
}