import { PaymentGateway } from "../../enums/Payment"
import { AppContext } from "../../context/Appcontext"
import { useContext } from "react"
import { Trans, useTranslation } from "react-i18next"


export const PaymentMethodText
  = () => {
  const { t } = useTranslation()

  const {
    paymentMethod,
  } = useContext(AppContext)

  return (
    <div className="payment-details-information flex-b-50">
      <h2>{ t("summary.payment-method") }</h2>
      <div className="inner-box">
        <div className="payment-details-values">
          <table>
            <tr>
              <td>{ paymentMethod?.name }</td>
            </tr>
            {
              (() => {
                switch (paymentMethod?.gateway) {
                  case PaymentGateway.VISMA.toString():
                    return <Trans i18nKey="payment-methods.visma-pay.information" t={ t }>
                      Teksti <a target="_blank" href={ t("payment-methods.visma-pay.link-url") }
                                rel="noreferrer">Linkki</a>
                    </Trans>
                  case PaymentGateway.PAYTRAIL.toString():
                    return <Trans i18nKey="payment-methods.paytrail.information" t={ t }>
                      Teksti <a target="_blank" href={ t("payment-methods.paytrail.link-url") }
                                rel="noreferrer">Linkki</a>
                    </Trans>
                  default:
                    return null
                }
              })()
            }
          </table>
        </div>
      </div>
    </div>
  )

}
export default PaymentMethodText
