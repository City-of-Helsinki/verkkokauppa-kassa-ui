import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  IconAngleLeft,
  IconAngleRight,
  Checkbox,
} from "hds-react";
import { useHistory, useParams } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

import Products from "./Products";
import { AppContext } from "../context/Appcontext";
import { Formik, Form, Field } from "formik";

function Summary() {
  const { t } = useTranslation();
  const { orderId, firstName, lastName, email, phone } = useContext(AppContext);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const handleClick = () => setAcceptTerms(!acceptTerms);

  const history = useHistory();
  let { id } = useParams();

  if (!firstName) {
    history.push("/" + id);
  }

  const goBack = () => {
    history.goBack(); // TODO: ok?
  };

  return (
    <div className="App2">
      <Container className="checkout-container" id="checkout-container">
        <Products activeStep={2} />

        <div className="subscriber-details">
          <h2>{t("summary.customer-information")}</h2>
          <div className="subscriber-details-values">
            <p>
              {firstName} {lastName}
            </p>
            <p>{email}</p>
            <p>{phone}</p>
          </div>
          <hr />
        </div>

        <div className="checkout-actions">
          <Formik
            initialValues={{ acceptTerms: false }}
            onSubmit={() => {
              history.push("/" + orderId + "/paymentmethod");
            }}
            validate={(values) => {
              const errors: any = {};
              if (!values.acceptTerms) {
                errors.acceptTerms = t("summary.terms.cb-error");
              }
              return errors
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Field
                  as={Checkbox}
                  id="acceptTerms"
                  type="checkbox"
                  name="acceptTerms"
                  label={
                    <Trans i18nKey="summary.terms.cb-label" t={t}>I have read and agree to the <a href="#">terms of use</a> and <a href="#">privacy policy</a></Trans>
                  }
                  className="checkout-input"
                  errorText={
                    errors.acceptTerms && touched.acceptTerms
                      ? errors.acceptTerms
                      : undefined
                  }
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit"
                  iconRight={<IconAngleRight />}
                >
                  {t("checkout.form.submit-button")}
                </Button>
                <Button
                  onClick={goBack}
                  className="cancel"
                  variant="secondary"
                  iconLeft={<IconAngleLeft />}
                >
                  {t("common.cancel-and-return")}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    </div>
  );
}

export default Summary;
