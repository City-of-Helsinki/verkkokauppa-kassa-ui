import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  activeStep: number;
}

function Products(props: Props) {
  const { t } = useTranslation();

  const [cartItems, setCartItems] = useState();
  const [cartTotalsGross] = useState(0);
  let activeStep = props.activeStep;


  if (activeStep == 1) {
    return (
      <div className="product-list">
        <div className="product-list-header">
          {cartItems ? t("checkout.general-description") + ":" : ""}
        </div>
        <table>
          <tbody>{cartItems}</tbody>
        </table>
      </div>
    );
  } else if (activeStep == 2) {
    return (
      <div className="product-list">
        <div className="product-list-header">
          <h2>{t("summary.general-description")}</h2>
        </div>
        <table>
          <tbody>{cartItems}</tbody>
        </table>
        <div className="product-summary">
          {t("summary.totals.total-price")}:{" "}
          <span className="cart-total">{cartTotalsGross} &euro;</span>
        </div>
      </div>
    );
  } else {
    return null; // TODO: ok?
  }
}

export default Products;
