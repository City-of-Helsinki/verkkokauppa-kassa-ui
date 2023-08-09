import React, { FunctionComponent, useContext, useState } from "react"
import { Button, Container, IconAngleLeft, IconAngleRight, LoadingSpinner, Notification } from "hds-react"
import { Trans, useTranslation } from "react-i18next"

import { usePaymentMethods } from "../talons/checkout/usePaymentMethods"
import { PaymentMethod } from "./PaymentMethod"
import ConfigurableContainer from "./ConfigurableContainer"
import { AppContext } from "../context/Appcontext"
import { PaymentGateway } from "../enums/Payment"
import { redirectToSummaryPage } from "../services/RouteService"
import { useHistory } from "react-router-dom"
import i18n from "i18next"
import useCancelAndBackToService from "../hooks/useCancelAndBackToService"
import { useSessionStorage } from "../hooks/useStorage"
import { RouteConfigs } from "../enums/RouteConfigs"

export const PaymentMethods: FunctionComponent = () => {
 
  const {isValidForCheckout, merchantUrl, orderId } = useContext(AppContext);
  
  const { t } = useTranslation();

  const history = useHistory();

  const [noMethodSelected, setNoMethodSelected] = useState(true);
  const {
    availablePaymentMethods,
    currentSelectedPaymentMethod,
    currentSelectedPaymentMethodGateway,
    initialSelectedMethod,
    setCurrentSelectedPaymentMethod,
    setCurrentSelectedPaymentMethodGateway,
    isLoading,
    // handleProceedToPayment,
    savePaymentMethod,
    proceedToPaymentLoading,
    goBack,
    setPaymentMethod
  } = usePaymentMethods();

  const { cancelAndBackToService } = useCancelAndBackToService(
    orderId,
    merchantUrl
  )
  const [ fromCustomerDetails ] = useSessionStorage(RouteConfigs.FROM_CUSTOMER_DETAILS_ROUTE)

  const goBackToMerchant = () => {
    window.location.href = merchantUrl;
  };

  const hasPaymentMethods = availablePaymentMethods && Object.keys(availablePaymentMethods).length > 0

  const vismaPaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway === PaymentGateway.VISMA;
  })

  const paytrailPaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway === PaymentGateway.PAYTRAIL;
  })

  const invoicePaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway === PaymentGateway.INVOICE;
  })

  const hasVismaPaymentMethods = vismaPaymentMethods && Object.keys(vismaPaymentMethods).length > 0
  const hasPaytrailPaymentMethods = paytrailPaymentMethods && Object.keys(paytrailPaymentMethods).length > 0
  const hasInvoicePaymentMethods = invoicePaymentMethods && Object.keys(invoicePaymentMethods).length > 0

  if (isLoading ||  proceedToPaymentLoading || !hasPaymentMethods) {
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
            iconRight={<IconAngleRight  className={'icon-right'}/>}
          >
            {t("success.proceed-to-service")}
          </Button>
        </div>
      </Container>
    );
  } else {
    return (
      <Container className="checkout-container">
        {hasVismaPaymentMethods && <h2>{t("payment-methods.choose-payment-method")}</h2>}
        {hasVismaPaymentMethods && <div className="inner-box">
          {hasVismaPaymentMethods ? (
            <p>{t("payment-methods.choose-payment-method-info")}</p>
          ) : (
            <p>{t("payment-methods.no-payment-methods-info")}</p>
          )}
  
          <ul className="payment_methods" aria-label={t("payment-methods.choose-payment-method")}>
            {hasVismaPaymentMethods &&
              Object.values(vismaPaymentMethods).map((vismaPaymentMethod) => {
                const { code, img, name, gateway } = vismaPaymentMethod
                const isSelected =
                  currentSelectedPaymentMethod === null
                    ? initialSelectedMethod === null
                    : currentSelectedPaymentMethod === code && currentSelectedPaymentMethodGateway === PaymentGateway.VISMA;
  
                const handleSelectPaymentMethod = () => {
                  setNoMethodSelected(false);
                  setCurrentSelectedPaymentMethod(code);
                  setCurrentSelectedPaymentMethodGateway(gateway);
                  setPaymentMethod(vismaPaymentMethod);
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
          <Trans i18nKey="payment-methods.visma-pay.information" t={t}>
            Teksti <a target="_blank"  href={t("payment-methods.visma-pay.link-url")} rel="noreferrer">Linkki</a>
          </Trans>
        </div>
        }

        {(hasPaytrailPaymentMethods) && <h2>{t("payment-methods.choose-payment-method")}</h2>}
        {(hasPaytrailPaymentMethods) && <div className="inner-box">
          {hasPaytrailPaymentMethods ? (
            <p>{t("payment-methods.choose-payment-method-info")}</p>
          ) : (
            <p>{t("payment-methods.no-payment-methods-info")}</p>
          )}

          <ul className="payment_methods" aria-label={t("payment-methods.choose-payment-method")}>
            {hasPaytrailPaymentMethods &&
              Object.values(paytrailPaymentMethods).map((paytrailPaymentMethod) => {
                const { code, img, name, gateway } = paytrailPaymentMethod
                const isSelected =
                  currentSelectedPaymentMethod === null
                    ? initialSelectedMethod === null
                    : currentSelectedPaymentMethod === code && currentSelectedPaymentMethodGateway === PaymentGateway.PAYTRAIL;

                const handlePaytrailSelectPaymentMethod = () => {
                  setNoMethodSelected(false);
                  setCurrentSelectedPaymentMethod(code);
                  setCurrentSelectedPaymentMethodGateway(gateway);
                  setPaymentMethod(paytrailPaymentMethod);
                }

                const cssRootClass = "payment_method";

                // TODO: styling
                return (
                  <PaymentMethod
                    key={name}
                    className={
                      isSelected ? cssRootClass + " selected" : cssRootClass
                    }
                    onClick={handlePaytrailSelectPaymentMethod}
                    onChange={handlePaytrailSelectPaymentMethod}
                    onFocus={handlePaytrailSelectPaymentMethod}
                    image={img}
                    title={name}
                    checked={isSelected}
                  />
                );
              })}
          </ul>
          <Trans i18nKey="payment-methods.paytrail.information" t={t}>
            Teksti <a target="_blank"  href={t("payment-methods.paytrail.link-url")} rel="noreferrer">Linkki</a>
          </Trans>
        </div>
        }

        <div className="checkout-actions">

          <div className="checkout-actions desktop-flex">
            <Button
              className="submit"
              // onClick={handleProceedToPayment}
              onClick={async () => {
                await savePaymentMethod();
                redirectToSummaryPage(history, orderId, i18n.language);
              }}
              disabled={noMethodSelected || isLoading || proceedToPaymentLoading || !isValidForCheckout}
              iconRight={<IconAngleRight  className={'icon-right'}/>}
            >
              {t("checkout.form.submit-button-next")}
            </Button>
            {
              fromCustomerDetails?.fromCustomerDetails === true  ?
                <Button
                  className="cancel"
                  onClick={goBack}
                  variant="secondary"
                  iconLeft={<IconAngleLeft  className={'icon-left'} />}
                >
                  {t("common.cancel-and-return")}
                </Button>
                :
                <Button
                  className="cancel"
                  variant="secondary"
                  iconLeft={<IconAngleLeft  className={'icon-left'} />}
                  onClick={cancelAndBackToService}
                >
                  {t("common.cancel-and-return-referrer")}
                </Button>
            }
          </div>
        </div>

      </Container>
    );}
  }
  

export default PaymentMethods;