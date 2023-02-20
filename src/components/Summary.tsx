import React, { useContext } from "react"
import { Button, Checkbox, Container, IconAngleLeft, IconAngleRight, IconInfoCircle, Notification } from "hds-react"
import { useHistory, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import Products from "./Products"
import { AppContext } from "../context/Appcontext"
import { Field, Form, Formik } from "formik"
import { getSearchParam } from "../hooks/useSearchParam"
import { stringToArray } from "../utils/StringUtils"
import ContractRow from "./ContractRow"
import { redirectToCustomerDetails } from "../services/RouteService"
import i18n from "i18next"
import { usePaymentMethods } from "../talons/checkout/usePaymentMethods"
import MerchantInformation from "./merchant/MerchantInformation"
import { PaymentMethodText } from "./summary/PaymentMethodText"
import CustomerInformation from "./summary/CustomerInformation"


function Summary() {
  const { t } = useTranslation();
  const { orderId, firstName, lastName, email, phone, merchantUrl, type } = useContext(AppContext);

  const history = useHistory();
  let { id } = useParams();

  const {
    handleProceedToPayment,
  } = usePaymentMethods();

  let skipTermsAcceptForNamespaces = stringToArray(process.env.REACT_APP_SKIP_TERMS_ACCEPT_FOR_NAMESPACES);
  // const isSkipTermsAcceptForNameSpace = skipTermsAcceptForNamespaces.includes(namespace);
  const isSkipTermsAcceptForNameSpace = false;

  if (!firstName) {
    redirectToCustomerDetails(history, orderId, i18n.language)
  }

  const goBack = () => {
    history.goBack(); // TODO: ok?
  };

  const backToService = () => {
    window.location.replace(merchantUrl);
  };

  const paymentPaid = getSearchParam("paymentPaid");

  return (
    <div className="App2">
      <Container className="checkout-container">
        {paymentPaid === "false" ? (
          <Notification label={t("alert.payment-cancelled.title")} type="alert">{t("alert.payment-cancelled.description")}</Notification>
        ) : (
          ""
        )}
      </Container>
      <Container className="checkout-container desktop-flex wrap" id="checkout-container"
      >

        <div className="wrapper">
          <div className="flex-b-50 ">
            <div className="margin-wrapper">
              <CustomerInformation/>
              <hr/>
              <div className="subscriber-details wrapper">

                <div className="checkout-actions wrapper">
                  <Formik
                    initialValues={{ acceptTerms: false }}
                    onSubmit={async () => {
                      await handleProceedToPayment()
                    }}
                    validate={(values) => {
                      const errors: any = {};
                      // skips validation for some namespaces
                      if (!isSkipTermsAcceptForNameSpace && !values.acceptTerms ) {
                        errors.acceptTerms = t("summary.terms.cb-error");
                      }

                      return errors
                    }}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>

                        {(function() {
                          // Render when skip
                          if (!isSkipTermsAcceptForNameSpace) {
                            return [
                              <h2 className={'info-circle-header'}>{<IconInfoCircle className={'info-circle'}/>} {t("summary.contract-description")}</h2>,
                              <ContractRow orderType={type}/>,
                              <Field
                                as={Checkbox}
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
                            return null;
                          }
                        })()}

                        <div className="desktop-flex no-gap">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="submit"
                            iconRight={<IconAngleRight />}
                          >
                            {t("checkout.form.submit-button")}
                          </Button>

                          {paymentPaid === "false" ? (
                            <Button
                              onClick={backToService}
                              className="cancel"
                              variant="secondary"
                              iconLeft={<IconAngleLeft />}
                            >
                              {t("common.cancel-and-return")}
                            </Button>
                          ) : (
                            <Button
                              onClick={goBack}
                              className="cancel"
                              variant="secondary"
                              iconLeft={<IconAngleLeft />}
                            >
                              {t("common.cancel-and-return")}
                            </Button>
                          )}

                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-b-50">
            <Products activeStep={2} />
            <PaymentMethodText/>
            <hr/>
            <MerchantInformation/>
          </div>

          <div className="flex-b-100">

          </div>

        </div>


      </Container>
    </div>
  );
}

export default Summary;
