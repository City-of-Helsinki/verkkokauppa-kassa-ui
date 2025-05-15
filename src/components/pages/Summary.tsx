import React, { useContext } from "react"
import { Button, Checkbox, IconAngleLeft, IconAngleRight, IconInfoCircle } from "hds-react"
import { Container, Notification } from "hds-react-next"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Products from "../product/Products"
import { AppContext } from "../../context/Appcontext"
import { Field, Form, Formik } from "formik"
import { getSearchParam } from "../../hooks/general/useSearchParam"
import { stringToArray } from "../../utils/StringUtils"
import { redirectToCustomerDetails, redirectToPaymentMethodPage } from "../../services/RouteService"
import i18n from "i18next"
import { usePaymentMethods } from "../../hooks/checkout/usePaymentMethods"
import MerchantInformation from "../merchant/MerchantInformation"
import { PaymentMethodText } from "../payment/PaymentMethodText"
import CustomerInformation from "../customer/CustomerInformation"
import { OrderType } from "../../enums/Order"
import { useCardFormParameters } from "../../hooks/checkout/useCardFormParameters"
import ContractRow from "../contractRow/ContractRow"


function Summary() {
  const { t } = useTranslation()
  const { orderId, firstName, type, namespace, paymentMethod, invoice } = useContext(AppContext)

  const history = useHistory()

  const {
    handleProceedToPayment,
  } = usePaymentMethods()

  const {
    redirectToPaytrailCardForm,
  } = useCardFormParameters()

  let skipTermsAcceptForNamespaces = stringToArray(process.env.REACT_APP_SKIP_TERMS_ACCEPT_FOR_NAMESPACES)
  const isSkipTermsAcceptForNameSpace = skipTermsAcceptForNamespaces.includes(namespace);

  if (!firstName) {
    redirectToCustomerDetails(history, orderId, i18n.language)
  }

  const paymentPaid = getSearchParam("paymentPaid")

  return (
    <div className="App2">
      <Container className="checkout-container">
        { paymentPaid === "false" ? (
          <Notification label={ t("alert.payment-cancelled.title") }
                        type="alert">{ t("alert.payment-cancelled.description") }</Notification>
        ) : (
          ""
        ) }
      </Container>
      <Container className="checkout-container desktop-flex-no-block wrap" id="checkout-container"
      >

        <div className="wrapper">
          <div className="flex-b-50 ">
            <div className="margin-wrapper">
              <CustomerInformation/>
              <hr/>
              <div className="subscriber-details wrapper">

                <div className="checkout-actions wrapper">
                  <Formik
                    initialValues={ { acceptTerms: false } }
                    onSubmit={ async () => {
                      if (type === OrderType.SUBSCRIPTION.toString()) {
                        await redirectToPaytrailCardForm(orderId)
                      } else {
                        await handleProceedToPayment()
                      }
                    } }
                    validate={ (values) => {
                      const errors: any = {}
                      // skips validation for some namespaces
                      if (!isSkipTermsAcceptForNameSpace && !values.acceptTerms) {
                        errors.acceptTerms = t("summary.terms.cb-error")
                      }

                      return errors
                    } }
                  >

                    { ({ errors, touched, isSubmitting }) => (
                      <Form>

                        { (function () {
                          // Render when skip
                          if (!isSkipTermsAcceptForNameSpace) {
                            return [
                              <h2 key={'info-circle'} className={ 'info-circle-header' }>{ <IconInfoCircle
                                className={ 'info-circle' }/> } { t("summary.contract-description") }</h2>,
                              <ContractRow key={'contract-row-component'} orderType={ type } paymentMethod={paymentMethod} invoice={invoice}/>,
                              <Field
                                as={ Checkbox }
                                id="acceptTerms"
                                type="checkbox"
                                name="acceptTerms"
                                label={
                                  t('summary.terms.cb-label')
                                }
                                className="checkout-input"
                                errorText={
                                  errors.acceptTerms && touched.acceptTerms
                                    ? errors.acceptTerms
                                    : undefined
                                }
                              />

                            ]
                          } else {
                            return null
                          }
                        })() }

                        <div className="desktop-flex no-gap">
                          <Button
                            type="submit"
                            disabled={ isSubmitting }
                            className="submit"
                            iconRight={ <IconAngleRight className={ 'icon-right' }/> }
                          >
                            { t("checkout.form.submit-button") }
                          </Button>

                          { paymentPaid === "false" ? (
                            <Button
                              onClick={() => {
                                redirectToPaymentMethodPage(history, orderId, i18n.language);
                              }}
                              className="cancel"
                              variant="secondary"
                              iconLeft={ <IconAngleLeft className={ 'icon-left' }/> }
                            >
                              { t("common.cancel-and-return") }
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                redirectToPaymentMethodPage(history, orderId, i18n.language);
                              }}
                              className="cancel"
                              variant="secondary"
                              iconLeft={ <IconAngleLeft className={ 'icon-left' }/> }
                            >
                              { t("common.cancel-and-return") }
                            </Button>
                          ) }

                        </div>
                      </Form>
                    ) }
                  </Formik>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-b-50">
            <Products activeStep={ 2 }/>
            <PaymentMethodText/>
            <hr/>
            <MerchantInformation/>
          </div>

          <div className="flex-b-100">

          </div>

        </div>


      </Container>
    </div>
  )
}

export default Summary
