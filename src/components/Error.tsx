import React, { useContext } from "react";

import { Container, Notification, Button, IconAngleRight} from "hds-react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/Appcontext";

export const Error = () => {
  const { t } = useTranslation();

  const { orderId, isValidForCheckout, merchantUrl } = useContext(AppContext);

  const goBackToMerchant = () => {
    window.location.href = merchantUrl;
  };


  if (orderId) {

    if (isValidForCheckout === false) {
      return (
        <Container className="checkout-container desktop-flex">
          <Notification className="error-notification" label={t("error.error-title")} type="error">
              {t("error.purchase.invalid-instant-purchase-variables")}
          </Notification>
          <div className="checkout-actions">
            <Button
              onClick={goBackToMerchant}
              className="submit"
              iconRight={<IconAngleRight />}
            >
              {t("error.proceed-to-service")}
            </Button>
          </div>
        </Container>
      )
    } else {
      return (
        <Container className="checkout-container desktop-flex">
          <Notification className="error-notification" label={t("error.error-title")} type="error">
              {t("error.purchase.invalid-instant-purchase-link")}
          </Notification>
          <div className="checkout-actions">
            <Button
              onClick={goBackToMerchant}
              className="submit"
              iconRight={<IconAngleRight />}
            >
              {t("error.proceed-to-service")}
            </Button>
          </div>
        </Container>
      )
    }

  } else {
    return (
      <Container className="checkout-container desktop-flex">
        <Notification className="error-notification" label={t("error.error-title")} type="error">
          {t("error.generic-error")}
        </Notification>
      </Container>
    )
  }

}
export default Error