import React, { useContext } from "react"
// import { Button } from "hds-react"
import {
  Button,
  ButtonVariant,
  Container,
  IconAngleLeft,
  IconAngleRight,
  LoadingSpinner,
  TextInput
} from "hds-react-next"
import { useHistory } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Field, Form, Formik } from "formik"

import Products from "../product/Products"
import { AppActionsContext, AppContext } from "../../context/Appcontext"
import { useCustomer } from "../../hooks/checkout/useCustomer"
import { redirectToPaymentMethodPage, redirectToSummaryPage } from "../../services/RouteService"
import { useSessionStorage } from "../../hooks/general/useStorage"
import useGetCancelUrlAndRedirectBackToService from "../../hooks/general/useGetCancelUrlAndRedirectBackToService"
import { RouteConfigs } from "../../enums/RouteConfigs"
import { usePaymentMethods } from "../../hooks/checkout/usePaymentMethods"
import ConfigurableContainer from "../layout/containers/ConfigurableContainer"
import { savePaymentMethodToOrder } from "../../services/PaymentMethod"


export const CustomerDetails = () => {
  const { i18n, t } = useTranslation();
  const { setCustomer } = useCustomer();
  const { orderId, firstName, lastName, email, phone, merchantUrl } = useContext(AppContext);
  const { setFirstName, setLastName, setEmail, setPhone } = useContext(
    AppActionsContext
  );
  const history = useHistory();
  const [, update] = useSessionStorage(RouteConfigs.FROM_CUSTOMER_DETAILS_ROUTE);

  const {
    availablePaymentMethods,
    isLoading
  } = usePaymentMethods()

  const { getCancelUrlAndRedirectBackToService } = useGetCancelUrlAndRedirectBackToService(
    orderId,
    merchantUrl
  )

  if (isLoading) {
    return <ConfigurableContainer containerClassName={ 'box py-5 full-width' }>
      <LoadingSpinner/>
    </ConfigurableContainer>
  }

  return (
    <div className="App2">
      <Container className="checkout-container desktop-flex" id="checkout-container">
        <Products activeStep={2} />

        <div className="subscriber-details">
          <h2>{t("checkout.address-information")}</h2>
          <Formik
            initialValues={{
              firstName,
              lastName,
              email,
              confirmEmail: email,
              phone,
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.firstName) {
                errors.firstName = t("common.validation.required");
              } else if (values.firstName.length > 30) {
                errors.firstName = t("common.validation.maxlength", {
                  maxLength: 30,
                });
              }

              if (!values.lastName) {
                errors.lastName = t("common.validation.required");
              } else if (values.lastName.length > 40) {
                errors.lastName = t("common.validation.maxlength", {
                  maxLength: 40,
                });
              }

              if (!values.email) {
                errors.email = t("common.validation.required");
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = t("error.constraint.email.valid");
              }

              if (!values.confirmEmail) {
                errors.confirmEmail = t("common.validation.required");
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.confirmEmail)
              ) {
                errors.confirmEmail = t("error.constraint.email.valid");
              } else if (values.confirmEmail !== values.email) {
                errors.confirmEmail = t("error.constraint.email.nomatch");
              }


              const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

              if (values.phone) {
                if (!regex.test(values.phone)) {
                  errors.phone = t("error.constraint.phone.valid");
                }
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              if (orderId) {
                setFirstName(values.firstName);
                setLastName(values.lastName);
                setEmail(values.email);
                setPhone(values.phone);
                await setCustomer({ orderId, ...values });
              }
              setSubmitting(false);
              update({
                fromCustomerDetails: true
              });

              // Convert the object into an array and filter for "free" gateway
              const freeGatewayMethods = Object.values(availablePaymentMethods).filter(
                (method) => method.gateway === "free"
              );

              if (freeGatewayMethods && freeGatewayMethods.length === 1) {
                const savedMethod = await savePaymentMethodToOrder(orderId, freeGatewayMethods[0])
                if (savedMethod.status === 200) {
                  redirectToSummaryPage(history, orderId, i18n.language);
                }

              }else {
                //redirectToSummaryPage(history, orderId, i18n.language)
                redirectToPaymentMethodPage(history, orderId, i18n.language)
              }


            }}
          >
            {({ errors, touched, isSubmitting }) => (
                        
              <Form>
                <div className="inner-box">
                <Field
                  as={TextInput}
                  id="firstName"
                  type="text"
                  name="firstName"
                  label={t("checkout.form.fields.firstname.label")}
                  className="checkout-input"
                  helperText={t("checkout.form.fields.firstname.helper-text")}
                  errorText={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="lastName"
                  type="text"
                  name="lastName"
                  label={t("checkout.form.fields.surname.label")}
                  className="checkout-input"
                  helperText={t("checkout.form.fields.surname.helper-text")}
                  errorText={
                    errors.lastName && touched.lastName
                      ? errors.lastName
                      : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="email"
                  type="email"
                  name="email"
                  label={t("checkout.form.fields.email.label")}
                  className="checkout-input"
                  helperText={t("checkout.form.fields.email.helper-text")}
                  errorText={
                    errors.email && touched.email ? errors.email : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="confirmEmail"
                  type="email"
                  name="confirmEmail"
                  label={t("checkout.form.fields.confirmEmail.label")}
                  className="checkout-input"
                  helperText={t("checkout.form.fields.confirmEmail.helper-text")}
                  errorText={
                    errors.confirmEmail && touched.confirmEmail ? errors.confirmEmail : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="phone"
                  type="text"
                  name="phone"
                  label={t("checkout.form.fields.phone.label")}
                  className="checkout-input"
                  helperText={t("checkout.form.fields.phone.helper-text")}
                  errorText={
                    errors.phone && touched.phone ? errors.phone : undefined
                  }
                />
                </div>

                <div className="checkout-actions desktop-flex top">
                  <Button
                    type="submit"
                    className="submit"
                    disabled={isSubmitting}
                    iconEnd={<IconAngleRight className={'icon-right'}/>}
                  >
                    {t("checkout.form.submit-button-next")}
                  </Button>
                  <Button
                    className="cancel"
                    variant={ButtonVariant.Secondary}
                    iconStart={<IconAngleLeft className={'icon-left'}/>}
                    onClick={getCancelUrlAndRedirectBackToService}
                  >
                    {t("common.cancel-and-return-referrer")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default CustomerDetails;
