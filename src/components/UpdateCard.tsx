import React, { useContext, useEffect, useState } from "react";

import { Container, IconAngleRight, Button, Notification} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext} from "../context/Appcontext"
import {useUpdateCard} from "../talons/checkout/useUpdateCard"


function UpdateCard() {
  const { t } = useTranslation();

  const {orderId, subscriptionId, firstName, lastName, email, phone, merchantCity, merchantEmail, merchantName, merchantPhone, merchantStreet, merchantZip} = useContext(AppContext);

  const history = useHistory();
  if (!orderId) {
      history.push("/");
  }

  const { fetchUpdateCardPaymentUrl, loading: updateCardPaymentUrlLoading } = useUpdateCard();
  const [, setUpdateCardUrlLoading] = useState(true);

  let { id } = useParams();

  const [updateCardPaymentUrl, setUpdateCardPaymentUrl] = useState("");


  const handleProceedToUpdateCard = () => {
    if (updateCardPaymentUrl) {
      window.location.href = updateCardPaymentUrl;
    }
  };

  if (!subscriptionId) {
    history.push("/");
  }

  useEffect(() => {
    setUpdateCardUrlLoading(false)

    if (subscriptionId) {
      fetchUpdateCardPaymentUrl(subscriptionId).then((data) => {
        if (updateCardPaymentUrlLoading) {
          setUpdateCardUrlLoading(true)
          return
        }
        if (null !== data) {
          setUpdateCardPaymentUrl(data.paymentUrl)
        } 

        setUpdateCardUrlLoading(false)
      });
    }

  }, [id, orderId]);

  return (
    <div className="App2">
      <Container className="checkout-container success" id="checkout-container">

        <div className="desktop-flex normal">
          <div className="inner-box">
            {t("update-card.prefix")}
          </div>
        </div>

        <div className="desktop-flex normal">
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
      <br></br>

      <Notification className="success-notification" label={t("update-card.more-info-header")} type="info">{t("update-card.more-info-content")}</Notification>
      
      <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            onClick={handleProceedToUpdateCard}
            iconRight={<IconAngleRight />}
            disabled={updateCardPaymentUrlLoading}
          >
           {t("update-card.cta")}
          </Button>

          
        </div>
      </Container>
    </div>
  );
}

export default UpdateCard;