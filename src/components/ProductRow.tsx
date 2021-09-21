import React, { FunctionComponent } from "react";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  quantity: number;
  productName: string;
  rowPriceTotal: number;
  rowPriceVat: number;
  vatPercentage: number;
};
export const ProductRow: FunctionComponent<Props> = (props) => {
  const { quantity, productName, rowPriceTotal, rowPriceVat, vatPercentage } = props;

  const { t } = useTranslation();
  return (
    <tr>
      <td>
        {quantity > 1 && <span>{quantity} kpl. </span>}
        {productName}
        <br></br>
        <span className="normal padded">{t("common.vat-text",{vatPercentage : vatPercentage})}</span>
      </td>
      <td>
        {rowPriceTotal}&euro;
        <br></br>
        <span className="normal padded">{rowPriceVat}&euro;</span>
      </td>
    </tr>
  );
};
