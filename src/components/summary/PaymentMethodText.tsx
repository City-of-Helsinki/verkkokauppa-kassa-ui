import { AppContext } from "../../context/Appcontext"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

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
              <td className={'full-width'}>{ paymentMethod?.name }</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )

}
export default PaymentMethodText
