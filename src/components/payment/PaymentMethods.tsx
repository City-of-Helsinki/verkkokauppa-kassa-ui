import React, { FunctionComponent, useContext, useState } from "react"
import { Button, IconAngleLeft, IconAngleRight, LoadingSpinner } from "hds-react"
import { Container, Notification } from "hds-react-next"
import { Trans, useTranslation } from "react-i18next"

import { usePaymentMethods } from "../../hooks/checkout/usePaymentMethods"
import { PaymentMethod } from "./PaymentMethod"
import ConfigurableContainer from "../layout/containers/ConfigurableContainer"
import { AppContext } from "../../context/Appcontext"
import { PaymentGateway } from "../../enums/Payment"
import { redirectToInvoicePage, redirectToSummaryPage } from "../../services/RouteService"
import { useHistory } from "react-router-dom"
import i18n from "i18next"
import useGetCancelUrlAndRedirectBackToService from "../../hooks/general/useGetCancelUrlAndRedirectBackToService"
import { useSessionStorage } from "../../hooks/general/useStorage"
import { RouteConfigs } from "../../enums/RouteConfigs"
import { FinnishBusinessIds } from "finnish-business-ids"
import PaymentMethodBusinessId from "./PaymentMethodBusinessId"

export const PaymentMethods: FunctionComponent = () => {

  const { isValidForCheckout, merchantUrl, orderId } = useContext(AppContext)
  // const { businessId } = useInvoiceContext()

  const { t } = useTranslation()

  const history = useHistory()

  const [ noMethodSelected, setNoMethodSelected ] = useState(true)
  const [ businessId, setBusinessId ] = useState('')

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
    setPaymentMethod,
    paymentMethod,
  } = usePaymentMethods()

  const { getCancelUrlAndRedirectBackToService } = useGetCancelUrlAndRedirectBackToService(
    orderId,
    merchantUrl
  )
  const [ fromCustomerDetails ] = useSessionStorage(RouteConfigs.FROM_CUSTOMER_DETAILS_ROUTE)

  const goBackToMerchant = () => {
    window.location.href = merchantUrl
  }

  const hasPaymentMethods = availablePaymentMethods && Object.keys(availablePaymentMethods).length > 0

  const vismaPaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway.toLowerCase() === PaymentGateway.VISMA
  })

  const paytrailPaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway.toLowerCase() === PaymentGateway.PAYTRAIL
  })

  const invoicePaymentMethods = Object.values(availablePaymentMethods).filter(value => {
    return value.gateway.toLowerCase() === PaymentGateway.INVOICE
  })

  const hasVismaPaymentMethods = vismaPaymentMethods && Object.keys(vismaPaymentMethods).length > 0
  const hasPaytrailPaymentMethods = paytrailPaymentMethods && Object.keys(paytrailPaymentMethods).length > 0
  const hasInvoicePaymentMethods = invoicePaymentMethods && Object.keys(invoicePaymentMethods).length > 0

  if (isLoading || proceedToPaymentLoading || !hasPaymentMethods) {
    return <ConfigurableContainer containerClassName={ 'box py-5 full-width' }>
      <LoadingSpinner/>
    </ConfigurableContainer>
  }

  if (!isValidForCheckout) {
    return (
      <Container className="checkout-container">
        <h2>{ t("payment-methods.choose-payment-method") }</h2>
        <Notification label={ t("error.error-title") }
                      type="error">{ t("error.purchase.not-valid-for-checkout") }</Notification>

        <div className="checkout-actions desktop-flex no-margin">
          <Button
            onClick={ goBackToMerchant }
            className="submit"
            iconRight={ <IconAngleRight className={ 'icon-right' }/> }
          >
            { t("success.proceed-to-service") }
          </Button>
        </div>
      </Container>
    )
  } else {
    return (
      <Container className="checkout-container">
        { hasVismaPaymentMethods && <h2>{ t("payment-methods.choose-payment-method") }</h2> }
        { hasVismaPaymentMethods && <div className="inner-box">
          { hasVismaPaymentMethods ? (
            <p>{ t("payment-methods.choose-payment-method-info") }</p>
          ) : (
            <p>{ t("payment-methods.no-payment-methods-info") }</p>
          ) }

          <ul className="payment_methods" aria-label={ t("payment-methods.choose-payment-method") }>
            { hasVismaPaymentMethods &&
              Object.values(vismaPaymentMethods).map((vismaPaymentMethod) => {
                const { code, img, name, gateway } = vismaPaymentMethod
                const isSelected =
                  currentSelectedPaymentMethod === null
                    ? initialSelectedMethod === null
                    : currentSelectedPaymentMethod === code && currentSelectedPaymentMethodGateway === PaymentGateway.VISMA

                const handleSelectPaymentMethod = () => {
                  setNoMethodSelected(false)
                  setCurrentSelectedPaymentMethod(code)
                  setCurrentSelectedPaymentMethodGateway(gateway)
                  setPaymentMethod(vismaPaymentMethod)
                }

                const cssRootClass = "payment_method"

                // TODO: styling
                return (
                  <PaymentMethod
                    key={ name }
                    className={
                      isSelected ? cssRootClass + " selected" : cssRootClass
                    }
                    onClick={ handleSelectPaymentMethod }
                    onChange={ handleSelectPaymentMethod }
                    onFocus={ handleSelectPaymentMethod }
                    image={ img }
                    title={ name }
                    checked={ isSelected }
                  />
                )
              }) }
          </ul>
          <Trans i18nKey="payment-methods.visma-pay.information" t={ t }>
            Teksti <a target="_blank" href={ t("payment-methods.visma-pay.link-url") } rel="noreferrer">Linkki</a>
          </Trans>
        </div>
        }

        { (hasPaytrailPaymentMethods) && <h2>{ t("payment-methods.choose-payment-method") }</h2> }
        { (hasPaytrailPaymentMethods) && <div className="inner-box">
          { hasPaytrailPaymentMethods ? (
            <p>{ t("payment-methods.choose-payment-method-info") }</p>
          ) : (
            <p>{ t("payment-methods.no-payment-methods-info") }</p>
          ) }

          <ul className="payment_methods" aria-label={ t("payment-methods.choose-payment-method") }>
            { hasPaytrailPaymentMethods &&
              Object.values(paytrailPaymentMethods).map((paytrailPaymentMethod) => {
                const { code, img, name, gateway } = paytrailPaymentMethod
                const isSelected =
                  currentSelectedPaymentMethod === null
                    ? initialSelectedMethod === null
                    : currentSelectedPaymentMethod === code && currentSelectedPaymentMethodGateway === PaymentGateway.PAYTRAIL

                const handlePaytrailSelectPaymentMethod = () => {
                  setNoMethodSelected(false)
                  setCurrentSelectedPaymentMethod(code)
                  setCurrentSelectedPaymentMethodGateway(gateway)
                  setPaymentMethod(paytrailPaymentMethod)
                }

                const cssRootClass = "payment_method"

                // TODO: styling
                return (
                  <PaymentMethod
                    key={ name }
                    className={
                      isSelected ? cssRootClass + " selected" : cssRootClass
                    }
                    onClick={ handlePaytrailSelectPaymentMethod }
                    onChange={ handlePaytrailSelectPaymentMethod }
                    onFocus={ handlePaytrailSelectPaymentMethod }
                    image={ img }
                    title={ name }
                    checked={ isSelected }
                  />
                )
              }) }
          </ul>
          <Trans i18nKey="payment-methods.paytrail.information" t={ t }>
            Teksti <a target="_blank" href={ t("payment-methods.paytrail.link-url") } rel="noreferrer">Linkki</a>
          </Trans>
        </div>
        }

        {/* Invoice Start*/ }
        { (hasInvoicePaymentMethods) && <h2>{ t("payment-methods.choose-payment-method-invoice") }</h2> }
        { (hasInvoicePaymentMethods) && <div className="inner-box">
          <p>{ t("payment-methods.choose-payment-method-invoice-info") }</p>
          <ul className="payment_methods" aria-label={ t("payment-methods.choose-payment-method-invoice") }>
            { Object.values(invoicePaymentMethods).map((invoicePaymentMethod) => {
              const { code, img, name, gateway } = invoicePaymentMethod
              const isSelected =
                currentSelectedPaymentMethod === null
                  ? initialSelectedMethod === null
                  : currentSelectedPaymentMethod === code && currentSelectedPaymentMethodGateway === PaymentGateway.INVOICE

              const handleInvoiceSelectPaymentMethod = () => {
                setNoMethodSelected(false)
                setBusinessId('')
                setCurrentSelectedPaymentMethod(code)
                setCurrentSelectedPaymentMethodGateway(gateway)
                setPaymentMethod(invoicePaymentMethod)
              }

              return (
                <>
                  <PaymentMethod
                    key={ name }
                    className={
                      `payment_method ${ isSelected && 'selected' }`
                    }
                    onClick={ handleInvoiceSelectPaymentMethod }
                    onChange={ handleInvoiceSelectPaymentMethod }
                    onFocus={ handleInvoiceSelectPaymentMethod }
                    image={ img }
                    title={ name }
                    checked={ isSelected }
                  />
                  { isSelected && <PaymentMethodBusinessId onChange={setBusinessId}/> }
                </>
              )
            }) }
          </ul>
          <Trans i18nKey="payment-methods.invoice.information" t={ t }>
            Teksti <a target="_blank" href={ t("payment-methods.invoice.link-url") } rel="noreferrer">Linkki</a>
          </Trans>
        </div>
        }
        {/* Invoice End*/ }

        <div className="checkout-actions">

          <div className="checkout-actions desktop-flex">
            <Button
              className="submit"
              // onClick={handleProceedToPayment}
              onClick={ async () => {

                await savePaymentMethod()

                switch (paymentMethod?.gateway) {
                  case PaymentGateway.INVOICE:
                    if (businessId && FinnishBusinessIds.isValidBusinessId(businessId)) {
                      redirectToInvoicePage(history, orderId, i18n.language, businessId)
                    }
                    break
                  case PaymentGateway.PAYTRAIL:
                  case PaymentGateway.VISMA:
                    redirectToSummaryPage(history, orderId, i18n.language)
                }
              } }
              disabled={ noMethodSelected || isLoading || proceedToPaymentLoading || !isValidForCheckout || (currentSelectedPaymentMethodGateway === PaymentGateway.INVOICE && !FinnishBusinessIds.isValidBusinessId(businessId)) }
              iconRight={ <IconAngleRight className={ 'icon-right' }/> }
            >
              { t("checkout.form.submit-button-next") }
            </Button>
            {
              fromCustomerDetails?.fromCustomerDetails === true ?
                <Button
                  className="cancel"
                  onClick={ goBack }
                  variant="secondary"
                  iconLeft={ <IconAngleLeft className={ 'icon-left' }/> }
                >
                  { t("common.cancel-and-return") }
                </Button>
                :
                <Button
                  className="cancel"
                  variant="secondary"
                  iconLeft={ <IconAngleLeft className={ 'icon-left' }/> }
                  onClick={ getCancelUrlAndRedirectBackToService }
                >
                  { t("common.cancel-and-return-referrer") }
                </Button>
            }
          </div>
        </div>

      </Container>
    )
  }
}


export default PaymentMethods