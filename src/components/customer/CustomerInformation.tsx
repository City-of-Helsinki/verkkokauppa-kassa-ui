import React, { useContext } from "react"
import { useTranslation } from "react-i18next"
import { AppContext } from "../../context/Appcontext"

export const CustomerInformation
  = () => {
  const { t } = useTranslation()

  const {
    firstName,
    lastName,
    email,
    phone,
  } = useContext(AppContext)

  return (
    <div className="customer-details-information">
      <h2>{ t("summary.customer-information") }</h2>
        <table>
          <tr>
            <td>{ firstName } { lastName }</td>
          </tr>
          <tr>
            <td>{ email }</td>
          </tr>
          <tr>
            <td>{ phone }</td>
          </tr>
        </table>
    </div>
  )

}
export default CustomerInformation
