import React, { useContext } from "react";

import { Container, Notification, } from "hds-react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/Appcontext";

export const Error = () => {
  const { t } = useTranslation();

  const { orderId } = useContext(AppContext);

  // Read orderId from local storage
  const orderIdFromStorage = localStorage.getItem("orderId");

  // Read userId from session storage
  const userId = sessionStorage.getItem("userId");

  // Generate href if orderId is found
  const currentHost = window.location.origin;
  const orderLink = orderIdFromStorage
    ? `${currentHost}/${orderIdFromStorage}${userId ? `?user=${userId}` : ""}`
    : null;

  if (orderId || orderIdFromStorage) {
    return (
      <Container className="checkout-container desktop-flex">
        <Notification className="error-notification" label={t("error.error-title")} type="error">
            {t("error.purchase.invalid-instant-purchase-link")}
          {orderLink && (
            <div>
              <a style={{
                marginTop: '2rem'
              }} href={orderLink}>{orderLink}</a>
            </div>
          )}


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