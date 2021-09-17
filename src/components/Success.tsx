import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  IconAngleRight,
  IconPrinter,
  Notification
} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Products from "./Products";
import {AppActionsContext, AppContext} from "../context/Appcontext"
import {usePayment} from "../talons/checkout/usePayment"
import {dateParser} from "../utils/dateParser"

function Success() {
  const { t } = useTranslation();
  const { orderId, firstName, lastName, email, phone, paymentMethodLabel, timestamp, total, merchantCity, merchantEmail, merchantName, merchantPhone, merchantStreet, merchantUrl, merchantZip, merchantTermsOfServiceUrl} = useContext(AppContext);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { fetchPayment, loading: paymentLoading } = usePayment();
  const [loading, setLoading] = useState(true);
  const { setPaymentId, setPayment } = useContext(AppActionsContext);

  const history = useHistory();
  let { id } = useParams();

  let paymentdate = dateParser(timestamp, "Europe/Helsinki");

  history[0] = history[history.length - 1]
  history.length = 1

  if (!firstName) {
    history.push("/" + id);
  }

  const goBackToMerchant = () => {
    window.location.href = merchantUrl;
  };

  useEffect(() => {
    setLoading(true)
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
  }, [id, orderId]);


  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">

        <Notification label={t("success.notification.label")} type="success">{t("success.notification.description", {email: email, })}</Notification>

        <div className="checkout-actions">
          <Button
            onClick={goBackToMerchant}
            className="submit"
            iconRight={<IconAngleRight />}
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
                  <tr>
                    <td>{t("success.payment.total")}</td>
                    <td className="right">{total} &euro;</td>
                  </tr>
                  <tr>
                    <td>{t("success.payment.method")}</td>
                    <td className="right">{paymentMethodLabel}</td>
                  </tr>
                  <tr>
                    <td>{t("success.payment.timestamp")}</td>
                    <td className="right">{paymentdate}</td>
                  </tr>
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
            {t("success.cancellation-details")} <a target="_blank" href={merchantTermsOfServiceUrl}>{t("success.cancellation-link-text")}</a>
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
