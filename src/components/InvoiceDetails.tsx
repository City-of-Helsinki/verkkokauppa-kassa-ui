import React, { useContext } from "react";
import { Button, Container, IconAngleLeft, IconAngleRight, TextInput, } from "hds-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { AppActionsContext, AppContext } from "../context/Appcontext";
import { useCustomer } from "../talons/checkout/useCustomer";
import { useOrder } from "../talons/checkout/useOrder";
import authService from '../auth/authService';
import { FinnishBusinessIds } from 'finnish-business-ids'

export interface OrderInvoice {
  invoiceId: string
  businessId: string
  name: string
  address: string
  postcode: string
  city: string
  ovtId?: string
}

export const InvoiceDetails = () => {
  const { i18n, t } = useTranslation();
  const { setCustomer } = useCustomer();
  const { orderId, phone, merchantUrl, invoice } = useContext(AppContext);
  const { setInvoice } = useContext(
    AppActionsContext
  );
  const initialInvoiceData = {
    invoiceId: "",
    businessId: "",
    name: "",
    address: "",
    postcode: "",
    city: "",
    ovtId: ""
  };

  const {
    businessId,
    name,
    address,
    postcode,
    city,
    ovtId
  } = invoice || initialInvoiceData;

  const history = useHistory();
  const { cancelOrder } = useOrder();

  if (authService.isAuthenticated()) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const profileUser = authService.getUser();
  }

  const backToPaymentMethods = () => {
    history.push(`/${orderId}/paymentmethod`)
  };

  return (
    <div className="App2">
      <Container className="checkout-container desktop-flex" id="checkout-container">

        <div className="subscriber-details">
          <h2>{t("invoice.business-information")}</h2>
          <p>{t("invoice.invoice-payment-information")}</p>
          <Formik
            initialValues={{
              businessId,
              name,
              address,
              postcode,
              phone,
            }}
            validate={(values) => {
              const errors: any = {};

              if (!values.businessId) {
                errors.businessId = t("common.validation.required");
                // TODO businessId
              } else if (
                !FinnishBusinessIds.isValidBusinessId(values.businessId)
              ) {
                errors.businessId = t("error.constraint.businessId.valid");
              }

              if (!values.name) {
                errors.name = t("common.validation.required");
              } else if (values.name.length > 40) {
                errors.name = t("common.validation.maxlength", {
                  maxLength: 40,
                });
              }

              if (!values.address) {
                errors.address = t("common.validation.required");
              } else if (values.address.length > 40) {
                errors.address = t("common.validation.maxlength", {
                  maxLength: 40,
                });
              }

              if (!values.postcode) {
                errors.postcode = t("common.validation.required");
              } else if (values.postcode.length > 40) {
                errors.postcode = t("common.validation.maxlength", {
                  maxLength: 40,
                });
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
                // setFirstName(values.businessId);
                // setLastName(values.name);
                // setEmail(values.address);
                // setPhone(values.phone);
                //await setCustomer({ orderId, ...values });
              }
              setSubmitting(false);

              if (authService.isAuthenticated()) {
                history.push("/profile/" + orderId + "/summary?lang=" + i18n.language);
              } else {
                history.push("/" + orderId + "/summary?lang=" + i18n.language);
              }
              
            }}
          >
            {({ errors, touched, isSubmitting }) => (
                        
              <Form>
                <div className="inner-box">
                <Field
                  as={TextInput}
                  id="businessId"
                  type="text"
                  name="businessId"
                  label={t("invoice.form.fields.businessId.label")}
                  className="checkout-input"
                  helperText={t("invoice.form.fields.businessId.helper-text")}
                  errorText={
                    errors.businessId && touched.businessId
                      ? errors.businessId
                      : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="name"
                  type="text"
                  name="name"
                  label={t("invoice.form.fields.name.label")}
                  className="checkout-input"
                  helperText={t("invoice.form.fields.name.helper-text")}
                  errorText={
                    errors.name && touched.name
                      ? errors.name
                      : undefined
                  }
                />
                <hr />
                <h2>{t("invoice.business-address-information")}</h2>

                <Field
                  as={TextInput}
                  id="address"
                  type="address"
                  name="address"
                  label={t("invoice.form.fields.address.label")}
                  className="checkout-input"
                  helperText={t("invoice.form.fields.address.helper-text")}
                  errorText={
                    errors.address && touched.address ? errors.address : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="postcode"
                  type="address"
                  name="postcode"
                  label={t("invoice.form.fields.postcode.label")}
                  className="checkout-input"
                  helperText={t("invoice.form.fields.postcode.helper-text")}
                  errorText={
                    errors.postcode && touched.postcode ? errors.postcode : undefined
                  }
                />
                <Field
                  as={TextInput}
                  id="phone"
                  type="text"
                  name="phone"
                  label={t("invoice.form.fields.phone.label")}
                  className="checkout-input"
                  helperText={t("invoice.form.fields.phone.helper-text")}
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
                    {t("invoice.form.submit-button-next")}
                  </Button>
                  <Button
                    className="cancel"
                    variant="secondary"
                    iconLeft={<IconAngleLeft />}
                    onClick={backToPaymentMethods}
                  >
                    {t("invoice.cancel-button")}
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

export default InvoiceDetails;
