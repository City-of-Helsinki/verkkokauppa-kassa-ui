import React, {useEffect, useState} from "react"
import { Button, Container, IconAngleLeft, IconAngleRight } from "hds-react";
import { useTranslation } from "react-i18next";

import { usePaymentMethods } from "../talons/checkout/usePaymentMethods";
import { PaymentMethod } from "./PaymentMethod";

const PaymentMethods = () => {
  const { t } = useTranslation();
  const {
    availablePaymentMethods,
    currentSelectedPaymentMethod,
    initialSelectedMethod,
    setCurrentSelectedPaymentMethod,
    isLoading,
    handleProceedToPayment,
    proceedToPaymentLoading,
    goBack,
  } = usePaymentMethods();

  // TODO: validate somehow that we're allowed to be here?

  if (isLoading) {
    return null;
  }

  const hasPaymentMethods = availablePaymentMethods && Object.keys(availablePaymentMethods).length > 0

  return (
    <Container>
      <h2>{t("payment-methods.choose-payment-method")}</h2>
      {hasPaymentMethods ? (
        <p>{t("payment-methods.choose-payment-method-info")}</p>
      ) : (
        <p>{t("payment-methods.no-payment-methods-info")}</p>
      )}

      <div className="payment_methods">
        {hasPaymentMethods &&
          Object.keys(availablePaymentMethods).map((key) => {
            const { code, img, name } = availablePaymentMethods[key]
            const isSelected =
              currentSelectedPaymentMethod === null
                ? initialSelectedMethod === code
                : currentSelectedPaymentMethod === code;

            const handleSelectPaymentMethod = () =>
              setCurrentSelectedPaymentMethod(code);
            const cssRootClass = "payment_method";

            // TODO: styling
            return (
              <PaymentMethod
                key={name}
                className={
                  isSelected ? cssRootClass + " selected" : cssRootClass
                }
                onClick={handleSelectPaymentMethod}
                onChange={handleSelectPaymentMethod}
                image={img}
                title={name}
                checked={isSelected}
              />
            );
          })}
      </div>
      <div className="checkout-actions">
        <Button
          className="submit"
          onClick={handleProceedToPayment}
          disabled={isLoading || proceedToPaymentLoading}
          iconRight={<IconAngleRight />}
        >
          {t("payment-methods.proceed-to-payment")}
        </Button>
        <Button
          className="cancel"
          onClick={goBack}
          variant="secondary"
          iconLeft={<IconAngleLeft />}
        >
          {t("common.cancel-and-return")}
        </Button>
      </div>
    </Container>
  );
};

export default PaymentMethods;
