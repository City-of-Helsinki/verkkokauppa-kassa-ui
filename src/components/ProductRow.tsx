import React, { FunctionComponent } from "react";

type Props = {
  quantity: number;
  productName: string;
  rowPriceTotal: number;
};
export const ProductRow: FunctionComponent<Props> = (props) => {
  const { quantity, productName, rowPriceTotal } = props;
  return (
    <tr>
      <td>
        {quantity} kpl. {productName}
      </td>
      <td>{rowPriceTotal}&euro;</td>
    </tr>
  );
};
