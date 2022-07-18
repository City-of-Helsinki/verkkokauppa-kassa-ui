import React, { FunctionComponent, useContext, useState } from "react"
import { Button, Container, IconAngleLeft, IconAngleRight, LoadingSpinner, Notification, TextInput } from "hds-react";
import { Trans, useTranslation } from "react-i18next";

import { usePaymentMethods } from "../talons/checkout/usePaymentMethods";
import { PaymentMethod } from "./PaymentMethod";
import ConfigurableContainer from "./ConfigurableContainer";
import { AppContext } from "../context/Appcontext"


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
  const [businessIdNotvalid, setbusinessIdNotvalid] = useState(false);

  const goBackToMerchant = () => {
    window.location.href = merchantUrl;
  };

  const hasOnlinePaymentMethods = availablePaymentMethods["online"] && Object.keys(availablePaymentMethods["online"]).length > 0
  const hasOfflinePaymentMethods = availablePaymentMethods["offline"] && Object.keys(availablePaymentMethods["offline"]).length > 0

  console.log(availablePaymentMethods);

  if (isLoading ||  proceedToPaymentLoading || !hasOnlinePaymentMethods) {
    return <ConfigurableContainer containerClassName={'box py-5 full-width'}>
      <LoadingSpinner />
    </ConfigurableContainer>;
  }

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
        {hasOnlinePaymentMethods ? (
        <div> 
          <h2>{t("payment-methods.online-payments")}</h2>
          <div className="inner-box">
            {hasOnlinePaymentMethods ? (
              <p>{t("payment-methods.choose-online-payment-method-info")}</p>
            ) : (
              <p>{t("payment-methods.no-payment-methods-info")}</p>
            )}
    
            <ul className="payment_methods" aria-label={t("payment-methods.choose-payment-method")}>
              {hasOnlinePaymentMethods &&
                Object.keys(availablePaymentMethods["online"]).map((key) => {
                  const { code, img, name } = availablePaymentMethods["online"][key]
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
            <div className="payment_method_suffix">
              <Trans i18nKey="payment-methods.visma-pay.information" t={t}>
                Teksti <a target="_blank"  href={t("payment-methods.visma-pay.link-url")} rel="noreferrer">Linkki</a>
              </Trans>
            </div>
          </div>
        </div>
        ) : ("") }

        {hasOfflinePaymentMethods ? (
        <div> 
          <h2>{t("payment-methods.offline-payments")}</h2>
          <div className="inner-box">
            {hasOfflinePaymentMethods ? (
              <p>{t("payment-methods.choose-offline-payment-method-info")}</p>
            ) : (
              <p>{t("payment-methods.no-payment-methods-info")}</p>
            )}
    
            <ul className="payment_methods" aria-label={t("payment-methods.choose-payment-method")}>
              {hasOfflinePaymentMethods &&
                Object.keys(availablePaymentMethods["offline"]).map((key) => {
                  const { code, img, name } = availablePaymentMethods["offline"][key]
                  const isSelected =
                    currentSelectedPaymentMethod === null
                      ? initialSelectedMethod === null
                      : currentSelectedPaymentMethod === code;
    
                  const handleSelectOffilinePaymentMethod = () => {
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
                      onClick={handleSelectOffilinePaymentMethod}
                      onChange={handleSelectOffilinePaymentMethod}
                      onFocus={handleSelectOffilinePaymentMethod}
                      image={img}
                      title={name}
                      checked={isSelected}    
                    />
                  );
                })}
            </ul>
            <div className="payment_method_suffix businessIdContainer">
                <TextInput id="businessId"
                  label={t("payment-methods.businessid-label")}
                  defaultValue=""
                  errorText="Error text"
                  helperText="Assistive text" 
                  invalid
                  />
            </div>


          </div>
        </div>
        ) : ("") }

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