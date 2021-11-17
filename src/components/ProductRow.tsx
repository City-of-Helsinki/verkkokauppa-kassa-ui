import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { parseOrderItemMetaVisibilityAndOrdinal } from "../utils/orderMeta";

type Props = {
  quantity: number;
  productName: string;
  rowPriceTotal: number;
  rowPriceVat: number;
  vatPercentage: number;
  meta: []
};
export const ProductRow: FunctionComponent<Props> = (props) => {
  const { quantity, productName, rowPriceTotal, rowPriceVat, vatPercentage, meta } = props;

  const { t } = useTranslation();

  let orderedMeta = parseOrderItemMetaVisibilityAndOrdinal(meta)

  return (
    <div className="product-row">
      <table>
        <tbody>
          <tr>
            <td>
              {quantity > 1 && <span>{quantity} {t("common.pcs")} </span>}
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
        </tbody>
      </table>
      {meta &&
        Array.isArray(orderedMeta) &&
        orderedMeta.map((metaItem) => (
            <div key={metaItem['orderItemMetaId']} className="meta"><div className="meta-label">{metaItem['label']}</div><div className="meta-value">{metaItem['value']}</div></div>
        ))}
    </div>
  );
};
