import React, { useContext, useEffect, useState } from "react";
import { Button, Container, IconAngleRight, Notification } from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Products from "../product/Products";
import { AppActionsContext, AppContext } from "../../context/Appcontext"
import { usePayment } from "../../hooks/checkout/usePayment"
import { dateParser } from "../../utils/dateParser"
import { vatCounter } from "../../utils/vatCounter";
import { redirectToCustomerDetails, redirectToLoggedInSuccessPageIfAuthenticated } from "../../services/RouteService";
import i18n from "i18next";

function Success() {
  const { t } = useTranslation();
  const { items, orderId, firstName, lastName, email, phone, paymentMethodLabel, timestamp, total, merchantCity, merchantEmail, merchantName, merchantPhone, merchantStreet, merchantUrl, merchantZip, merchantTermsOfServiceUrl} = useContext(AppContext);

  const { fetchPayment, loading: paymentLoading } = usePayment();
  const [, setLoading] = useState(true);
  const { setPayment } = useContext(AppActionsContext);

  const vatTable = vatCounter(items);

  const history = useHistory();
  let { id } = useParams();

  let paymentdate = dateParser(timestamp, "Europe/Helsinki");

  history[0] = history[history.length - 1]
  history.length = 1

  if (!firstName) {
    redirectToCustomerDetails(history, id, i18n.language)
  }

  const goBackToMerchant = () => {
    window.location.href = merchantUrl;
  };

  useEffect(() => {
    setLoading(true)

    redirectToLoggedInSuccessPageIfAuthenticated(history, orderId, i18n.language)
    
    if (id) {
      fetchPayment(id).then((data) => {
        if (paymentLoading) {
          setLoading(true)
          return
        }
        if (null !== data && data.orderId) {
          setPayment(data)
        } else {
          history.push("/");
        }
        setLoading(false)
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, orderId]);


  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">

        <Notification className="success-notification" label={t("success.notification.label")} type="success">{t("success.notification.description", {email: email, })}</Notification>

        <div className="checkout-actions">
          <Button
            onClick={goBackToMerchant}
            className="submit"
            iconRight={<IconAngleRight  className={'icon-right'}/>}
          >
            {t("success.proceed-to-service")}
          </Button>
        </div>

        <div className="desktop-flex normal">
          <div className="payment-details">
            <h2>{t("success.payment.description")}</h2>
            
            <div className="payment-details-values">
              <Products activeStep={4} />

              <div className="inner-box">
                <table>
                  <tbody>
                  <tr>
                    <td>{t("success.payment.total")}</td>
                    <td className="right">{total}&euro;</td>
                  </tr>
                    {vatTable &&
                      Object.entries(vatTable || {}).map(function ([key, value]) {
                        return (
                          <tr key={key} className="vat-row"><td><span className="normal">{t("common.vat-text",{vatPercentage : key})}</span></td><td className="right"><span className="cart-total normal">{value}&euro;</span></td></tr>
                        )
                      }
                    )}

                  <tr>
                    <td>{t("success.payment.method")}</td>
                    <td className="right">{paymentMethodLabel}</td>
                  </tr>
                  <tr>
                    <td>{t("success.payment.timestamp")}</td>
                    <td className="right">{paymentdate}</td>
                  </tr>
                  </tbody>

                </table>
              </div>
            </div>
            <hr />
          </div>

          <div className="subscriber-details">
            <h2>{t("summary.customer-information")}</h2>
            <div className="inner-box">
              <div className="subscriber-details-values">
                <table>
                  <tr><td>{firstName} {lastName}</td></tr>
                  <tr><td>{email}</td></tr>
                  <tr><td>{phone}</td></tr>
                </table>
              </div>
              <hr />
            </div>
          </div>

          <div className="merchant-details">
            <h2>{t("success.merchant-information")}</h2>
            <div className="inner-box">
              <div className="merchant-details-values">
                <table>
                  <tr><td>{merchantName}</td></tr>
                  <tr><td>{merchantStreet}</td></tr>
                  <tr><td>{merchantZip} {merchantCity}</td></tr>
                  <tr><td></td></tr>
                  <tr><td>{merchantEmail}</td></tr>
                  <tr><td>{merchantPhone}</td></tr>
                </table>
              </div>
              <hr />
            </div>
          </div>
        </div>

        <div className="checkout-actions">
          <div>
            {t("success.cancellation-details")} <a target="_blank" href={merchantTermsOfServiceUrl} rel="noreferrer">{t("success.cancellation-link-text")}</a>
          </div>
          <div className="centered-link">
            <a href={merchantUrl}>{t("success.proceed-to-service")}</a>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Success;
