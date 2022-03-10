import React, { useContext, useEffect, useState } from "react";

import { Container, IconAngleLeft, IconAngleRight, Button, Notification} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext} from "../context/Appcontext"
import {useUpdateCard} from "../talons/checkout/useUpdateCard"


function CardUpdateFailed() {
  const { t } = useTranslation();

  const { orderId, subscriptionId} = useContext(AppContext);

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

  const handleProceedToSuccess = () => {
    if (id) {
      window.location.href = "/"+id+"/success";
    }
  };

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

      <Notification className="success-notification" label={t("update-card.card-update-failed-header")} type="alert">{t("update-card.card-update-failed-content")}</Notification>

      <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            onClick={handleProceedToUpdateCard}
            iconRight={<IconAngleRight />}
            disabled={updateCardPaymentUrlLoading}
          >
           {t("update-card.card-update-failed-try-again")}
          </Button>
        </div>

        <div className="checkout-actions full-width-button">
          <Button
            type="submit"
            className="submit"
            variant="secondary"
            onClick={handleProceedToSuccess}
            iconRight={<IconAngleRight />}
          >
           {t("update-card.go-to-receipt")}
          </Button>

          
        </div>
      </Container>
    </div>
  );
}

export default CardUpdateFailed;