import React, { useContext } from "react";
import {
  IconAngleLeft,
  IconAngleRight,
  Container,
  Button,
  TextInput,
} from "hds-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form } from "formik";

import Products from "./Products";
import { AppActionsContext, AppContext } from "../context/Appcontext";
import { useCustomer } from "../talons/checkout/useCustomer";
import { useOrder } from "../talons/checkout/useOrder";

export const CustomerDetails = () => {
  const { i18n, t } = useTranslation();
  const { setCustomer } = useCustomer();

  const { orderId, firstName, lastName, email, phone, merchantUrl } = useContext(AppContext);
  const { setFirstName, setLastName, setEmail, setPhone } = useContext(
    AppActionsContext
  );
  const history = useHistory();
  const { cancelOrder } = useOrder();

  const cancelAndBackToService = () => {
    cancelOrder(orderId).then((data) => {
      if (null !== data && data.cancelUrl) {
        window.location.replace(data.cancelUrl);
      } else if (merchantUrl) {
        window.location.replace(merchantUrl);
      } else {
        history.push("/"); //TODO: Where to redirect if no service url available?
      }
    });
  };

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
              } else if (values.firstName.length > 15) {
                errors.firstName = t("common.validation.maxlength", {
                  maxLength: 15,
                });
              }

              if (!values.lastName) {
                errors.lastName = t("common.validation.required");
              } else if (values.lastName.length > 20) {
                errors.lastName = t("common.validation.maxlength", {
                  maxLength: 20,
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
              } else if (values.confirmEmail != values.email) {
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
              history.push("/" + orderId + "/summary?lang=" + i18n.language);
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
                    iconRight={<IconAngleRight />}
                  >
                    {t("checkout.form.submit-button")}
                  </Button>
                  <Button
                    className="cancel"
                    variant="secondary"
                    iconLeft={<IconAngleLeft />}
                    onClick={cancelAndBackToService}
                  >
                    {t("common.cancel-and-return")}
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
