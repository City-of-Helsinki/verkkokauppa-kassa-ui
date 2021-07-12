import React from "react";
import {Button, Container, IconAngleLeft, IconAngleRight} from "hds-react";
import {useTranslation} from "react-i18next";

import {usePaymentMethods} from "../talons/checkout/usePaymentMethods";

const PaymentMethods = () => {
    const {t} = useTranslation();
    const {
        availablePaymentMethods,
        currentSelectedPaymentMethod,
        initialSelectedMethod,
        setCurrentSelectedPaymentMethod,
        isLoading,
        handleProceedToPayment,
        proceedToPaymentLoading,
        goBack
    } = usePaymentMethods();

    // TODO: validate somehow that we're allowed to be here?

    if (isLoading) {
        return null;
    }

    const radios = availablePaymentMethods.map(({code, title, img}) => {
        const isSelected = currentSelectedPaymentMethod === null
            ? initialSelectedMethod === code
            : currentSelectedPaymentMethod === code;

        const handleSelectPaymentMethod = () => setCurrentSelectedPaymentMethod(code);
        const cssRootClass = "payment_method";
        const cssClass = isSelected ? (cssRootClass + ' selected') : cssRootClass;

        // TODO: styling
        return (
            <div
                key={code}
                className={cssClass}
                onClick={handleSelectPaymentMethod}>
                <input
                    className="radio_label"
                    type="radio"
                    name="payment_method"
                    value="small"
                    onChange={handleSelectPaymentMethod}
                    checked={isSelected}/>
                <img
                    className="payment_method_img"
                    src={img} alt={title}/>
                {title}
            </div>
        );
    });

    return (
        <Container>
            <h2>{t('payment-methods.choose-payment-method')}</h2>
            <p>{t('payment-methods.choose-payment-method-info')}</p>
            <div className="payment_methods">
                {radios}
            </div>
            <div className="checkout-actions">
                <Button
                    className="submit"
                    onClick={handleProceedToPayment}
                    disabled={isLoading || proceedToPaymentLoading}
                    iconRight={<IconAngleRight/>}
                >
                    {t('payment-methods.proceed-to-payment')}
                </Button>
                <Button
                    className="cancel"
                    onClick={goBack}
                    variant="secondary"
                    iconLeft={<IconAngleLeft/>}
                >
                    {t('common.cancel-and-return')}
                </Button>
            </div>
        </Container>
    );
};

export default PaymentMethods;