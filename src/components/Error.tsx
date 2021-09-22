import React, { useContext } from "react";

import {
  IconAngleLeft,
  IconAngleRight,
  Container,
  Button,
  Notification,
} from "hds-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/Appcontext";

export const Error = () => {
  const { i18n, t } = useTranslation();

  const { orderId } = useContext(AppContext);

  if (orderId) {
    return (
      <Container className="checkout-container desktop-flex">
        <Notification className="error-notification" label={t("error.error-title")} type="error">
            {t("error.purchase.invalid-instant-purchase-link")}
        </Notification>
      </Container>
    )
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