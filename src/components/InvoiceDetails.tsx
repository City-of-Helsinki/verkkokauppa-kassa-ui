import React, { useContext } from "react";
import { Button, Container, IconAngleLeft, IconAngleRight, TextInput, } from "hds-react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Field, Form, Formik } from "formik";
import { AppContext } from "../context/Appcontext";
import authService from '../auth/authService';
import { FinnishBusinessIds } from 'finnish-business-ids'
import { validatePartyId } from "../utils/ValidationUtils";
import { redirectToPaymentMethodPage, redirectToReceiptPage } from "../services/RouteService";

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
  //const { setInvoice } = useInvoice();
  const { orderId, invoice } = useContext(AppContext);
  const initialInvoiceData = {
    businessId: "",
    name: "",
    address: "",
    postcode: "",
    city: "",
    ovtId: ""
  } as OrderInvoice;

  const {
    businessId,
    name,
    address,
    postcode,
    city,
    ovtId
  } = invoice || initialInvoiceData;

  const history = useHistory();

  if (authService.isAuthenticated()) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const profileUser = authService.getUser();
  }

  const backToPaymentMethods = () => {
    redirectToPaymentMethodPage(history, orderId, i18n.language)
  };

  return (
    <div className="App2">
      <Container className="checkout-container desktop-flex" id="checkout-container">

        <div className="subscriber-details">
          <Formik
            initialValues={ {
              businessId,
              name,
              address,
              postcode,
              city,
              ovtId,
            } }
            validate={ (values) => {
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

              const postCodeRegex = /\b\d{5}\b/g;

              if (!values.postcode) {
                errors.postcode = t("common.validation.required");
              } else if (!postCodeRegex.test(values.postcode)) {
                errors.postcode = t("error.constraint.postcode.valid");
              }

              if (!values.city) {
                errors.city = t("common.validation.required");
              } else if (values.city.length > 40) {
                errors.city = t("common.validation.maxlength", {
                  maxLength: 40,
                });
              }

              if (values.ovtId !== undefined && values.ovtId !== "" && !validatePartyId(values.ovtId)) {
                errors.ovtId = t("error.constraint.ovtId.valid");
              }

              return errors;
            } }
            onSubmit={ async (values, { setSubmitting }) => {
              if (orderId) {
                // TODO comment out when we want to add values to database.
                // await setInvoice({
                //   orderId: orderId,
                //   invoice: {
                //     invoiceId: invoice?.invoiceId,
                //     businessId: values.businessId,
                //     name: values.name,
                //     address: values.address,
                //     postcode: values.postcode,
                //     city: values.city,
                //     ovtId: values.ovtId,
                //   }
                // } as CreateOrderInvoice)
              }
              setSubmitting(false);

              redirectToReceiptPage(history, orderId, i18n.language)

            } }
          >
            { ({ errors, touched, isSubmitting }) => (

              <Form>
                <div className="inner-box">
                  <h2>{ t("invoice.business-general-information") }</h2>
                  <Field
                    as={ TextInput }
                    id="businessId"
                    type="text"
                    name="businessId"
                    label={ t("invoice.form.fields.businessId.label") }
                    className="checkout-input"
                    helperText={ t("invoice.form.fields.businessId.helper-text") }
                    errorText={
                      errors.businessId && touched.businessId
                        ? errors.businessId
                        : undefined
                    }
                  />
                  <Field
                    as={ TextInput }
                    id="name"
                    type="text"
                    name="name"
                    label={ t("invoice.form.fields.name.label") }
                    className="checkout-input"
                    helperText={ t("invoice.form.fields.name.helper-text") }
                    errorText={
                      errors.name && touched.name
                        ? errors.name
                        : undefined
                    }
                  />
                  <hr/>
                  <h2>{ t("invoice.business-address-information") }</h2>

                  <Field
                    as={ TextInput }
                    id="address"
                    type="address"
                    name="address"
                    label={ t("invoice.form.fields.address.label") }
                    className="checkout-input"
                    helperText={ t("invoice.form.fields.address.helper-text") }
                    errorText={
                      errors.address && touched.address ? errors.address : undefined
                    }
                  />
                  <Field
                    as={ TextInput }
                    id="postcode"
                    type="address"
                    name="postcode"
                    label={ t("invoice.form.fields.postcode.label") }
                    className="checkout-input"
                    helperText={ t("invoice.form.fields.postcode.helper-text") }
                    errorText={
                      errors.postcode && touched.postcode ? errors.postcode : undefined
                    }
                  />
                  <Field
                    as={ TextInput }
                    id="city"
                    type="text"
                    name="city"
                    label={ t("invoice.form.fields.city.label") }
                    className="checkout-input"
                    helperText={ t("invoice.form.fields.city.helper-text") }
                    errorText={
                      errors.city && touched.city ? errors.city : undefined
                    }
                  />

                  <hr/>
                  <h2>{ t("invoice.e-invoice-information") }</h2>
                  <Field
                    as={ TextInput }
                    id="ovtId"
                    type="text"
                    name="ovtId"
                    label={ t("invoice.form.fields.ovtId.label") }
                    className="checkout-input"
                    helperText={ t("invoice.form.fields.ovtId.helper-text") }
                    errorText={
                      errors.ovtId && touched.ovtId ? errors.ovtId : undefined
                    }
                  />
                </div>

                <div className="checkout-actions desktop-flex top">
                  <Button
                    type="submit"
                    className="submit"
                    disabled={ isSubmitting }
                    iconRight={ <IconAngleRight  className={'icon-right'}/> }
                  >
                    { t("invoice.form.submit-button-next") }
                  </Button>
                  <Button
                    className="cancel"
                    variant="secondary"
                    iconLeft={ <IconAngleLeft  className={'icon-left'} /> }
                    onClick={ backToPaymentMethods }
                  >
                    { t("invoice.cancel-button") }
                  </Button>
                </div>
              </Form>
            ) }
          </Formik>
        </div>
      </Container>
    </div>
  );
};

export default InvoiceDetails;
