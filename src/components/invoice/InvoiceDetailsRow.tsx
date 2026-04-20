import React, { useContext } from "react";

import { useTranslation } from "react-i18next";
import { AppContext } from "../../context/Appcontext"

const InvoiceDetailsRow: React.FC = () => {
  const { t } = useTranslation();
  const { invoice } = useContext(AppContext);

  if (!invoice) return null; // Return nothing if invoice data is missing

  return (
    <div className="invoice-details p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{t("success.invoice-information")}</h2>
      <div className="inner-box p-2 border rounded">
        <table className="w-full">
          <tbody>
          <tr>
            <td className="font-semibold">{invoice?.name}</td>
          </tr>
          {invoice?.businessId && (
            <tr>
              <td>
                {t("invoice.businessId")}: {invoice?.businessId}
              </td>
            </tr>
          )}
          <tr>
            <td>{invoice?.address}</td>
          </tr>
          <tr>
            <td>
              {invoice?.postcode} {invoice?.city}
            </td>
          </tr>
          {invoice?.ovtId && (
            <tr>
              <td>
                {t("invoice.ovtId")}: {invoice?.ovtId}
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceDetailsRow;
