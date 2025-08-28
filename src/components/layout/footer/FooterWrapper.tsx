import { useTranslation } from "react-i18next"
import React from "react"
import { Footer } from "hds-react-next"
import { Logo } from "hds-react-next"
import { useLocation } from "react-router"

export function FooterWrapper() {
  const { t } = useTranslation()

  let footerLinks = []
  footerLinks.push([ "https://www.hel.fi/static/talpa/verkkokauppa-alustan-rekisteriseloste.pdf", t("footer.terms-url") ])
  // Handle updating the URL.

  return <Footer title={window.location.hostname} className="checkout-footer">
    <Footer.Navigation>
      {footerLinks.map((data) => (
        <Footer.Link key={data[0]} href={data[0]} onClick={(e: { preventDefault: () => void; }) => {
          e.preventDefault()
          window.open(data[0])
        }} label={data[1]} />
      ))
      }

      <Footer.Link key={"cookieConsentOpen"} href={"#"} onClick={(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        (window as any).hds.cookieConsent.openBanner(['preference', 'statistics'])
      }} label={t("footer.cookie-hub")} />

      <Footer.Link target={"_blank"} className={"footer-service-url"} key={"support-service-url"}
                   label={t("footer.service-url")} href={`/fi/information`} />
      <Footer.Link target={"_blank"} key={"support-email"} label={t("footer.support.header")}
                   href={`/fi/information#article2`} />
    </Footer.Navigation>
    <Footer.Base logo={<Logo alt="Helsingin kaupunki" sizes="medium"
                             src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNzggMzYiIHRpdGxlPSJIZWxzaW5naW4ga2F1cHVua2kiIHJvbGU9ImltZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoCiAgICAgICAgZD0iTTc1Ljc1MyAyLjI1MXYyMC43YzAgMy45NS0zLjI3NSA3LjE3OC03LjMxIDcuMTc4aC0yMi4yNmMtMi42NzQgMC01LjIwNS45Ni03LjE4MyAyLjczOWExMC43NDkgMTAuNzQ5IDAgMDAtNy4xODMtMi43NEg5LjUwOWMtNC4wMDMgMC03LjI0Ny0zLjIxLTcuMjQ3LTcuMTc3VjIuMjVoNzMuNDkxek00MC4xODcgMzQuODM1YTguNDcgOC40NyAwIDAxNi4wMTItMi40NzFoMjIuMjQ1YzUuMjY4IDAgOS41NTYtNC4yMTkgOS41NTYtOS40MTNWMEgwdjIyLjkzNWMwIDUuMTk0IDQuMjU2IDkuNDEzIDkuNTA5IDkuNDEzaDIyLjMwOGMyLjI2MyAwIDQuMzk4Ljg4MiA2LjAxMiAyLjQ3MUwzOS4wMTYgMzZsMS4xNy0xLjE2NXoiCiAgICAgICAgZmlsbD0iY3VycmVudENvbG9yIiAvPgogICAgPHBhdGgKICAgICAgICBkPSJNNjcuNTIyIDExLjY3NmMwIC42ODEtLjU1NiAxLjE3Ny0xLjI1NSAxLjE3Ny0uNyAwLTEuMjU1LS40OTYtMS4yNTUtMS4xNzcgMC0uNjgyLjU1Ni0xLjE3OCAxLjI1NS0xLjE3OC43LS4wMyAxLjI1NS40NjUgMS4yNTUgMS4xNzh6bS0yLjM1MiA5LjYyMmgyLjE3OHYtNy41NDZINjUuMTd2Ny41NDZ6bS0zLjkwOS00LjU1NmwyLjg0NSA0LjU1NmgtMi4zNjhsLTEuOTA3LTMuMDIyLTEuMDMzIDEuMjcxdjEuNzVoLTIuMTYxVjEwLjQ1M2gyLjE2djUuMDA0YzAgLjkzLS4xMSAxLjg2LS4xMSAxLjg2aC4wNDdzLjUwOS0uODIxLjkzOC0xLjQxbDEuNjUzLTIuMTU0aDIuNTQybC0yLjYwNiAyLjk5em0tNi44MTctLjI3OGMwLTEuODc1LS45MzgtMi44OTgtMi40MzItMi44OTgtMS4yNzEgMC0xLjkzOS43MjgtMi4zMiAxLjQyNmgtLjA0OGwuMTEyLTEuMjRoLTIuMTYydjcuNTQ2aDIuMTYyVjE2LjgyYzAtLjg2OC41MjQtMS40NzIgMS4zMzUtMS40NzIuODEgMCAxLjE2LjUyNyAxLjE2IDEuNTM0djQuNDE2aDIuMTc3bC4wMTYtNC44MzR6bS04LjkzMS00Ljc4OGMwIC42ODEtLjU1NyAxLjE3Ny0xLjI1NiAxLjE3Ny0uNyAwLTEuMjU1LS40OTYtMS4yNTUtMS4xNzcgMC0uNjgyLjU1Ni0xLjE3OCAxLjI1NS0xLjE3OC43MTUtLjAzIDEuMjU2LjQ2NSAxLjI1NiAxLjE3OHptLTIuMzUyIDkuNjIyaDIuMTc3di03LjU0Nkg0My4xNnY3LjU0NnptLTMuNzUtMi4xMDdjMC0uNjA1LS44NTktLjcyOS0xLjg2LTEuMDA4LTEuMTYtLjI5NC0yLjYyMi0uODY3LTIuNjIyLTIuMzA4IDAtMS40MjYgMS4zOTgtMi4zMjQgMy4wNTEtMi4zMjQgMS41NDEgMCAyLjk1Ni43MTIgMy41NDQgMS43MmwtMS44NiAxLjAyMmMtLjE5LS42NjYtLjc2Mi0xLjE5My0xLjYyLTEuMTkzLS41NTcgMC0xLjAxOC4yMzItMS4wMTguNjgyIDAgLjU3MyAxLjAxOC42MzUgMi4xNjIuOTkxIDEuMjA4LjM3MiAyLjMyLjkxNSAyLjMyIDIuMjk0IDAgMS41MTgtMS40NDYgMi40MTctMy4xMTUgMi40MTctMS44MTEgMC0zLjI0Mi0uNzQ0LTMuODc3LTEuOTUybDEuODktMS4wMzljLjI0LjgyMi45MjIgMS40NDEgMS45NTUgMS40NDEuNjIgMCAxLjA1LS4yNDggMS4wNS0uNzQzem0tNi44ODItOC42NzdoLTIuMTc3djguNjkyYzAgLjc3NS4xNzUgMS4zNDguNTA5IDEuNzA1LjM1LjM1Ni44OS41MjYgMS42MzYuNTI2LjI1NSAwIC41MjUtLjAzLjc4LS4wNzcuMjctLjA2Mi40NzYtLjE0LjY1LS4yMzNsLjE5MS0xLjQyNWEyLjA3IDIuMDcgMCAwMS0uNDYuMTI0Yy0uMTI4LjAzLS4yODcuMDMtLjQ2MS4wMy0uMjg2IDAtLjQxNC0uMDc3LS41MDktLjIxNi0uMTExLS4xNC0uMTU5LS4zODctLjE1OS0uNzQ0di04LjM4MnptLTcuMjQ2IDQuNTdjLS43OTUgMC0xLjQ0Ni41NTgtMS42MjEgMS41ODFoMy4wNWMuMDE3LS44OTktLjU4Ny0xLjU4LTEuNDMtMS41OHptMy4zNTMgMy4wMDdIMjMuNjNjLjA5NSAxLjIyNC43OTQgMS44MjggMS43IDEuODI4LjgxIDAgMS4zNjctLjUyNyAxLjQ5NC0xLjI0bDEuODI4IDEuMDA3Yy0uNTQuOTYxLTEuNyAxLjc5OC0zLjMyMiAxLjc5OC0yLjE2IDAtMy43NS0xLjQ3Mi0zLjc1LTMuOTUxIDAtMi40NjQgMS42Mi0zLjk1MSAzLjcwMy0zLjk1MSAyLjA4MSAwIDMuNDY0IDEuNDQgMy40NjQgMy40ODYtLjAxNi42MDQtLjExMSAxLjAyMy0uMTExIDEuMDIzem0tMTEuMDc3IDMuMjA3aDIuMjU3VjEwLjkxNmgtMi4yNTd2NC4xMDdoLTQuMjQzdi00LjA5MUgxMS4wNnYxMC4zNjZoMi4yNTZ2LTQuMjkyaDQuMjQzdjQuMjkyeiIKICAgICAgICBmaWxsPSJjdXJyZW50Q29sb3IiIC8+Cjwvc3ZnPg==" />}
                 copyrightHolder={t("footer.copyright.holder")}
                 copyrightText={t("footer.copyright.text")}
                 backToTopLabel={t("footer.back-to-top")} />
  </Footer>
}