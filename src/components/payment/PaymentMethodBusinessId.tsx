import React, { useContext } from "react"
import { TextInput, } from "hds-react"
import { Field, Form, Formik } from "formik"
import { AppContext } from "../../context/Appcontext"
import { FinnishBusinessIds } from "finnish-business-ids"
import { useTranslation } from "react-i18next"

interface PaymentMethodBusinessIdProps {
  onChange: (value: (((prevState: string) => string) | string)) => void
}

export const PaymentMethodBusinessId = ({ onChange }: PaymentMethodBusinessIdProps) => {
  const { t } = useTranslation()
  const { invoice } = useContext(AppContext)

  return (
    <div className="">
      <Formik
        initialValues={ {
          businessId: invoice?.businessId,
        } }
        validate={ (values) => {
          const errors: any = {}

          if (values.businessId) {
            if (!FinnishBusinessIds.isValidBusinessId(values.businessId)) {
              errors.businessId = t("error.constraint.businessId.valid")
            }
          }

          return errors
        } }
        onSubmit={ async (values, { setSubmitting }) => {
          setSubmitting(false)
        } }
      >
        { ({ errors, touched, isSubmitting, setFieldValue }) => (

          <Form>
            <div className="inner-box">
              <Field
                as={ TextInput }
                id="businessId"
                type="text"
                name="businessId"
                label={ t("checkout.form.fields.businessId.label") }
                className="checkout-input"
                helperText={ t("checkout.form.fields.businessId.helper-text") }
                errorText={
                  errors.businessId && touched.businessId ? errors.businessId : undefined
                }
                onChange={ (e: { target: { value: any } }) => {
                  const { value: businessId } = e.target
                  onChange(businessId)
                  setFieldValue("businessId", businessId)
                } }
              />
            </div>

          </Form>
        ) }
      </Formik>
    </div>
  )
}

export default PaymentMethodBusinessId
