import React, { useContext } from "react";
import {
  Button,
  Container,
  IconAngleLeft,
  IconAngleRight,
  Checkbox,
  Notification,
  IconInfoCircle
} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Products from "./Products";
import { AppContext } from "../context/Appcontext";
import { Formik, Form, Field } from "formik";
import { getSearchParam } from "../hooks/useSearchParam";
import { stringToArray } from "../utils/StringUtils";
import authService from '../auth/authService';
import ContractRow from "./ContractRow";
import { redirectToCustomerDetails, redirectToPaymentMethodPage } from "../services/RouteService";
import i18n from "i18next";
import { usePaymentMethods } from "../talons/checkout/usePaymentMethods";
import { PaymentGateway } from "../enums/Payment";
import MerchantInformation from "./merchant/MerchantInformation"

function Summary() {
  const { t } = useTranslation();
  const { orderId, firstName, lastName, email, phone, merchantUrl, namespace, type, paymentMethod } = useContext(AppContext);

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
      <Container className="checkout-container desktop-flex" id="checkout-container">
        <Products activeStep={2} />

        <div className="subscriber-details">
          <h2>{t("summary.customer-information")}</h2>
          <div className="inner-box">
            <div className="subscriber-details-values">
              <table>
                <tr><td>{firstName} {lastName}</td></tr>
                <tr><td>{email}</td></tr>
                <tr><td>{phone}</td></tr>
              </table>
            </div>
          </div>
          <hr />

          <h2>{t("summary.payment-method")}</h2>
          <div className="inner-box">
            <div className="payment-details-values">
              <table>
                <tr><td>{paymentMethod?.name}</td></tr>
                <tr><td><img className="payment_method_img" src={paymentMethod?.img} alt={paymentMethod?.name}/></td></tr>
                {
                  (()=> {
                    switch (paymentMethod?.gateway) {
                      case PaymentGateway.VISMA.toString():
                        return <Trans i18nKey="payment-methods.visma-pay.information" t={t}>
                                  Teksti <a target="_blank"  href={t("payment-methods.visma-pay.link-url")} rel="noreferrer">Linkki</a>
                                </Trans>;
                      case PaymentGateway.PAYTRAIL.toString():
                        return <Trans i18nKey="payment-methods.paytrail.information" t={t}>
                                  Teksti <a target="_blank"  href={t("payment-methods.paytrail.link-url")} rel="noreferrer">Linkki</a>
                               </Trans>;
                      default: return null;
                    }
                  })()
                }
              </table>
            </div>
          </div>
          <hr />

          <MerchantInformation/>


          <div className="checkout-actions">
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
                    />]
                  } else {
                    return null;
                  }
                })()}

                <div className="desktop-flex">
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
      </Container>
    </div>
  );
}

export default Summary;
