import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";

interface Props {
    orderId: string,
    activeStep: number
}

function Products(props: Props) {
    const {t} = useTranslation();

    const [cartItems, setCartItems] = useState();
    const [cartTotalsGross] = useState(0);
    let orderId = props.orderId;
    let activeStep = props.activeStep;

    const fetchOrder = () => {
        fetch('https://talpa-verkkokauppa-order-experience-api-test.apps.arodevtest.hel.fi/' + orderId)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                if (myJson.items != null && myJson.items.length > 0) {
                    var orderTotal;
                    let key: keyof typeof myJson.items // add this declaration
                    var orderRows;

                    {
                        myJson.items.map((key: any, index: any) => (
                            orderRows = <tr>
                                <td>{key.quantity} kpl. {key.productName}</td>
                                <td>{key.rowPriceTotal}&euro;</td>
                            </tr>
                        ))
                    }
                    var cartSize = document.getElementById('cart-size');
                    cartSize!.innerText = myJson.items.length;

                    setCartItems(orderRows)
                    //setCartTotalsGross(myJson.cartTotals.grossValue); // TODO: needed?
                }
            });
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    if (activeStep == 1) {
        return (
            <div className="product-list">
                <div className="product-list-header">
                    {cartItems ? t('checkout.general-description') + ':' : ''}
                </div>
                <table>
                    <tbody>
                    {cartItems}
                    </tbody>
                </table>
            </div>
        )
    } else if (activeStep == 2) {
        return (
            <div className="product-list">
                <div className="product-list-header">
                    <h2>{t('summary.general-description')}</h2>
                </div>
                <table>
                    <tbody>
                    {cartItems}
                    </tbody>
                </table>
                <div className="product-summary">
                    {t('summary.totals.total-price')}: <span className="cart-total">{cartTotalsGross} &euro;</span>
                </div>
            </div>
        )
    } else {
        return null; // TODO: ok?
    }

}

export default Products;