import React, { FunctionComponent, useState, useContext} from "react"
import { Button, Container, IconAngleLeft, IconAngleRight, LoadingSpinner, Notification, Checkbox } from "hds-react";
import { Trans, useTranslation } from "react-i18next";

import { usePaymentMethods } from "../talons/checkout/usePaymentMethods";
import { PaymentMethod } from "./PaymentMethod";
import ConfigurableContainer from "./ConfigurableContainer";
import { AppContext } from "../context/Appcontext"
import { Formik, Form, Field } from "formik";

export const PaymentMethods: FunctionComponent = () => {
 
  const {isValidForCheckout, merchantUrl } = useContext(AppContext);
  
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

  const [noMethodSelected, setNoMethodSelected] = useState(true);

  const goBackToMerchant = () => {
    window.location.href = merchantUrl;
  };

  if (isLoading) {
    return <ConfigurableContainer containerClassName={'box py-5 full-width'}>
              <LoadingSpinner />
           </ConfigurableContainer>;
  }

  const hasPaymentMethods = availablePaymentMethods && Object.keys(availablePaymentMethods).length > 0

  if (!isValidForCheckout) {
    return (
      <Container className="checkout-container">
        <h2>{t("payment-methods.choose-payment-method")}</h2>
        <Notification label={t("error.error-title")} type="error">{t("error.purchase.not-valid-for-checkout")}</Notification>

        <div className="checkout-actions desktop-flex no-margin">
          <Button
            onClick={goBackToMerchant}
            className="submit"
            iconRight={<IconAngleRight />}
          >
            {t("success.proceed-to-service")}
          </Button>
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="checkout-container">
        <h2>{t("payment-methods.choose-payment-method")}</h2>
        <div className="inner-box">
          {hasPaymentMethods ? (
            <p>{t("payment-methods.choose-payment-method-info")}</p>
          ) : (
            <p>{t("payment-methods.no-payment-methods-info")}</p>
          )}
  
          <ul className="payment_methods" aria-label={t("payment-methods.choose-payment-method")}>
            {hasPaymentMethods &&
              Object.keys(availablePaymentMethods).map((key) => {
                const { code, img, name } = availablePaymentMethods[key]
                const isSelected =
                  currentSelectedPaymentMethod === null
                    ? initialSelectedMethod === null
                    : currentSelectedPaymentMethod === code;
  
                const handleSelectPaymentMethod = () => {
                  setNoMethodSelected(false);
                  setCurrentSelectedPaymentMethod(code);
                }
  
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
                    onFocus={handleSelectPaymentMethod}
                    image={img}
                    title={name}
                    checked={isSelected}    
                  />
                );
              })}
          </ul>
        </div>

        <div className="checkout-actions">

          <div className="checkout-actions desktop-flex">
            <Button
              className="submit"
              onClick={handleProceedToPayment}
              disabled={noMethodSelected || isLoading || proceedToPaymentLoading || !isValidForCheckout}
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
        </div>

      </Container>
    );}
  }
  

export default PaymentMethods;