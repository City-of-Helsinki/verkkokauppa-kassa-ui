import React from "react"
import { useTranslation } from "react-i18next"
import { Container, Notification } from "hds-react"

type PaymentFailedNotificationProps = {
  paymentPaid: string;
};

const PaymentFailedNotification: React.FC<PaymentFailedNotificationProps> = ({ paymentPaid }) => {
  const { t } = useTranslation();

  return (
    <Container className="checkout-container">
      {paymentPaid === "false" && (
        <Notification
          label={t("alert.payment-cancelled.title")}
          type="alert"
        >
          {t("alert.payment-cancelled.description")}
        </Notification>
      )}
    </Container>
  );
};

export default PaymentFailedNotification;
