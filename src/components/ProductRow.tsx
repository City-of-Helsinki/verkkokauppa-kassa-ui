import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { parseOrderItemMetaVisibilityAndOrdinal } from "../utils/orderMeta";

type Props = {
  quantity: number;
  unit: string;
  productName: string;
  productLabel: string;
  productDescription: string;
  priceGross: number;
  priceNet: number;
  priceVat: number;
  rowPriceTotal: number;
  rowPriceVat: number;
  vatPercentage: number;
  meta: []
};
export const ProductRow: FunctionComponent<Props> = (props) => {
  const { quantity, unit,  productName, productLabel, productDescription, priceGross, priceNet, priceVat, rowPriceTotal, rowPriceVat, vatPercentage, meta } = props;

  const { t } = useTranslation();

  let orderedMeta = parseOrderItemMetaVisibilityAndOrdinal(meta)

  let className = "product-row inner-box";

  if (meta.length == 0) {
    className = "product-row inner-box without-meta";
  } 

  return (
    <div>
    {productLabel && <h3 className="product-label">{productLabel}</h3>}
    <div className={className}>
      <table>
        <tbody>
          <tr>
            <td>
              <span className="padded">{productName}</span>
              {productDescription && <span className="normal padded product-description"><br></br>{productDescription}</span>}
              <br></br>
              {quantity > 1 && <span className="normal padded">{quantity} {t("common.unit."+unit, unit)} {t("common.total")}</span>} <span className="normal padded">({t("common.vat-text",{vatPercentage : vatPercentage})})</span>
            </td>
            <td>
              <span className="normal padded">{priceGross}&euro; / {t("common.unit."+unit, unit)}</span>
              {productDescription && <span className="normal padded"><br></br>&nbsp;</span>}
              <br></br>
              <span className="padded">{rowPriceTotal}&euro;</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
      {meta &&
        Array.isArray(orderedMeta) &&
        orderedMeta.map((metaItem) => (
            <div key={metaItem['orderItemMetaId']} className="meta">
              {metaItem['label'] && <div className="meta-label">{metaItem['label']}</div>} 
              <div className="meta-value">{metaItem['value']}</div>
            </div>
        ))} 
      </div>  
    </div>
    </div>
  );
};
