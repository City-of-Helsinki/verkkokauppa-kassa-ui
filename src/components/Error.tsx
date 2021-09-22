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

export const Error = () => {
  const { i18n, t } = useTranslation();

  return (
    <Container className="checkout-container desktop-flex">
      <Notification className="error-notification" label={t("error.error-title")} type="error">
      {t("error.generic-error")}
        </Notification>
    </Container>
  )
}
export default Error