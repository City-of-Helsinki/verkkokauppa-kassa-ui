import React, { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes, useContext } from "react"
import { Trans, useTranslation } from "react-i18next"
import { PaymentMethod } from "../../types/payment/types"
import { OrderInvoice } from "../../types/invoice/types"
import { AppContext } from "../../context/Appcontext"
import { paymentApiUrl } from "../../constants"
import { isInvoiceOrder } from "../../services/OrderService"
import { Checkbox, IconInfoCircle } from "hds-react"
import { Field, FormikErrors, FormikTouched, FormikValues } from "formik"
import { stringToArray } from "../../utils/StringUtils"


type Props = {
  orderType: string,
  namespace: string,
  paymentMethod?: PaymentMethod,
  invoice?: OrderInvoice,
  errors: FormikErrors<FormikValues>,
  touched: FormikTouched<FormikValues>,
}

export const ContractRow: FunctionComponent<Props &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  const { orderType,
    paymentMethod,
    invoice,
    errors,
    touched,
    namespace,
  } = props
  const { t } = useTranslation()
  const { merchantTermsOfServiceUrl } = useContext(AppContext)
  let skipTermsAcceptForNamespaces = stringToArray(process.env.REACT_APP_SKIP_TERMS_ACCEPT_FOR_NAMESPACES)
  const isSkipTermsAcceptForNameSpace = skipTermsAcceptForNamespaces.includes(namespace);

  const isSubscription = orderType === "subscription"
  const isInvoice = isInvoiceOrder(orderType, paymentMethod, invoice)
  const showTerms = !isSkipTermsAcceptForNameSpace || isSubscription || isInvoice
  return showTerms ? <>
    <h2 key={"info-circle"} className={"info-circle-header"}>{
      <IconInfoCircle className={"info-circle"} />} {t("summary.contract-description")}
    </h2>

    <ul key={"contract-row"}>

      {
        !isSkipTermsAcceptForNameSpace && <li key={"li-summary.contract.service-label"}>
          <Trans key={"summary.contract.service-label"} i18nKey="summary.contract.service-label" t={t}> Teksti <a
            key={"summary.contract.service-label-link"} target="_blank" href={merchantTermsOfServiceUrl}
            rel="noreferrer">Linkki</a></Trans>
        </li>
      }
      {
        isSubscription && <li key={"li-summary.contract.subscription-label"}>
          <Trans key={"summary.contract.subscription-label"} i18nKey="summary.contract.subscription-label"
                 t={t}> Teksti <a
            key={"summary.contract.subscription-label-link"} target="_blank"
            href={t("summary.contract.subscription-terms-url")} rel="noreferrer">Linkki</a></Trans>
        </li>
      }
      {
        isInvoice && <li key={"li-summary.contract.invoice-label"}>
          <Trans key={"summary.contract.invoice-label"} i18nKey="summary.contract.invoice-label" t={t}> Teksti <a
            key={"summary.contract.invoice-label-link"} target="_blank"
            href={`${paymentApiUrl}${t("summary.contract.invoice-terms-filename")}`} rel="noreferrer">Linkki</a></Trans>
        </li>
      }

    </ul>
    {
      showTerms && <Field
        as={Checkbox}
        id="acceptTerms"
        type="checkbox"
        name="acceptTerms"
        label={
          t("summary.terms.cb-label")
        }
        className="checkout-input"
        errorText={
          errors.acceptTerms && touched.acceptTerms
            ? errors.acceptTerms
            : undefined
        }
      />

    }
  </> : null
}

export default ContractRow