import React from "react";
import { TextInput } from "hds-react-next";
import { Field, Form, Formik } from "formik";
import { FinnishBusinessIds } from "finnish-business-ids";
import { useTranslation } from "react-i18next";

interface PaymentMethodIdentifierProps {
  type: "person" | "company";
  value?: string;
  onChange: (value: string) => void;
}

export const PaymentMethodIdentifier = ({
  type,
  value,
  onChange,
}: PaymentMethodIdentifierProps) => {
  const { t } = useTranslation();

  const fieldName = type === "company" ? "businessId" : "ssn";
  const label =
    type === "company"
      ? t("checkout.form.fields.businessId.label")
      : t("checkout.form.fields.ssn.label");

  const helperText =
    type === "company"
      ? t("checkout.form.fields.businessId.helper-text")
      : t("checkout.form.fields.ssn.helper-text");

  return (
    <div className="">
      <Formik
        enableReinitialize
        initialValues={{
          [fieldName]: value ?? "",
        }}
        validate={(values) => {
          const errors: Record<string, string> = {};

          if (values[fieldName]) {
            // Validate only business id
            // SuomiFi can return also foreign identification numbers
            // so cannot validate finnish personal identification number
            if (
              type === "company" &&
              !FinnishBusinessIds.isValidBusinessId(values[fieldName])
            ) {
              errors[fieldName] = t("error.constraint.businessId.valid");
            }
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <div className="inner-box">
              <Field
                as={TextInput}
                id={fieldName}
                name={fieldName}
                label={label}
                helperText={helperText}
                errorText={
                  errors[fieldName] && touched[fieldName]
                    ? errors[fieldName]
                    : undefined
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  onChange(value);
                  setFieldValue(fieldName, value);
                }}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentMethodIdentifier;
