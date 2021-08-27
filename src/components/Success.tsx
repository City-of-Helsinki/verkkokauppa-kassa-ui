import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  IconAngleLeft,
  IconAngleRight,
  Checkbox,
  Notification
} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Payment from "./Payment";
import {AppActionsContext, AppContext} from "../context/Appcontext"
import {usePayment} from "../talons/checkout/usePayment"

function Success() {
  const { t } = useTranslation();
  const { orderId, firstName, lastName, email, phone, paymentId, paymentMethod, status, paymentType, total } = useContext(AppContext);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const handleClick = () => setAcceptTerms(!acceptTerms);
  const { fetchPayment, loading: paymentLoading } = usePayment();
  const [loading, setLoading] = useState(true);
  const { setPaymentId, setPayment } = useContext(AppActionsContext);

  const history = useHistory();
  let { id } = useParams();

  if (!firstName) {
    history.push("/" + id);
  }

  const goBack = () => {
    history.goBack(); // TODO: ok?
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
          console.log(data)
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
      <Container className="checkout-container" id="checkout-container">

        <Notification label={t("success.notification.label")} type="success">{t("success.notification.description", {email: email, })}</Notification>

        <div className="checkout-actions">
          <Button
            onClick={goBack}
            className="submit"
            iconRight={<IconAngleRight />}
          >
            {t("success.proceed-to-service")}
          </Button>
        </div>

        <div className="payment-details">
          <h2>{t("success.payment.description")}</h2>
          <div className="payment-details-values">
            <table>
              <tr>
                <td>{t("success.payment.total")}</td>
                <td className="right">{total} &euro;</td>
              </tr>
              <tr>
                <td>{t("success.payment.method")}</td>
                <td className="right">{paymentMethod}</td>
              </tr>
            </table>
          </div>
          <hr />
        </div>

        <div className="subscriber-details">
          <h2>{t("summary.customer-information")}</h2>
          <div className="subscriber-details-values">
            <p>
              {firstName} {lastName}
            </p>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
          <hr />
        </div>

        <div className="merchant-details">
          <h2>{t("success.merchant-information")}</h2>
          <div className="merchant-details-values">
            <p>
              {firstName} {lastName}
            </p>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
          <hr />
        </div>

        <div className="checkout-actions">
          <div>
            {t("success.cancellation-details")} {t("success.cancellation-link")}
          </div>
          <Button
            onClick={goBack}
            className="cancel"
            variant="secondary"
            iconLeft={<IconAngleLeft />}
          >
            {t("common.cancel-and-return")}
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Success;
