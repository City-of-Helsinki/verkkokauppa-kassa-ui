import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../context/Appcontext";
import { ProductRow } from "./ProductRow";

interface Props {
  activeStep: number;
}

function Products(props: Props) {
  const { t } = useTranslation();
  const { items, priceTotal } = useContext(AppContext);

  let activeStep = props.activeStep;

  if (null === activeStep) {
    return null;
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        {1 === activeStep && items ? t("checkout.general-description") + ":" : ""}
        {2 === activeStep &&
        <h2>{t("summary.general-description")}</h2>
        }
      </div>
      <table>
        <tbody>
          {items &&
            Array.isArray(items) &&
            items.map((item) => (
              <ProductRow key={item.orderItemId} {...item} />
            ))}
        </tbody>
      </table>
      {2 === activeStep && (
        <div className="product-summary">
          {t("summary.totals.total-price")}:{" "}
          <span className="cart-total">{priceTotal} &euro;</span>
        </div>
      )}
    </div>
  );
}

export default Products;
