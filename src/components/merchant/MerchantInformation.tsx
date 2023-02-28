import { useTranslation } from "react-i18next"
import React, { useContext } from "react"
import { AppContext } from "../../context/Appcontext"

export const MerchantInformation = () => {
  const { t } = useTranslation()

  const {
    merchantName,
    merchantStreet,
    merchantZip,
    merchantCity,
    merchantEmail,
    merchantPhone,
  } = useContext(AppContext)

  return (
    <div className="merchant-details">
      <h2>{t("summary.merchant-information")}</h2>
      <div className="inner-box">
        <div className="merchant-details-values">
          <table>
            <tr><td>{merchantName}</td></tr>
            <tr><td>{merchantStreet}</td></tr>
            <tr><td>{merchantZip} {merchantCity}</td></tr>
            <tr><td></td></tr>
            <tr><td>{merchantEmail}</td></tr>
            <tr><td>{merchantPhone}</td></tr>
          </table>
        </div>
        <hr />
      </div>
    </div>
  )

}
export default MerchantInformation