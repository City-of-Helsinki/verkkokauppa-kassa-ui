import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/Appcontext";
import { ProductRow } from "./ProductRow";
import { vatCounter } from "../utils/vatCounter";
interface Props {
  activeStep: number;
}

function Products(props: Props) {
  const { t } = useTranslation();
  const { items, priceTotal } = useContext(AppContext);

  const vatTable = vatCounter(items);
  let activeStep = props.activeStep;

  if (null === activeStep) {
    return null;
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        {1 === activeStep && items
          ? <h2>{t("checkout.general-description") + ":"}</h2>
          : ""}
        {2 === activeStep && <h2>{t("summary.general-description")}</h2>}
      </div>
      <div className="product-list-items">
        {items &&
          Array.isArray(items) &&
          items.map((item) => <ProductRow key={item.orderItemId} {...item} />)}
      </div>
      {2 === activeStep && (
        <div className="product-summary">
          <span className="bold padded">{t("summary.totals.total-price")}:{" "}</span>
          <span className="cart-total padded">{priceTotal}&euro;</span>
          <div className="vat-table">
            {vatTable &&
              Object.entries(vatTable || {}).map(function ([key, value]) {
                return (
                  <div className="vat-row"><span className="normal">{t("common.vat-text",{vatPercentage : key})}</span>  <span className="cart-total normal">{value}&euro;</span></div>
                )
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
