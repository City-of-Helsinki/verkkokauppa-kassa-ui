import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {AppContext} from '../../context/Appcontext';

interface PaymentMethod {
    title: string
    code: string
    img: string
}

export const usePaymentMethods = () => {
    const [currentSelectedPaymentMethod, setCurrentSelectedPaymentMethod] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [proceedToPaymentCalled, setProceedToPaymentCalled] = useState(false);
    const [paymentRequestDataLoading, setPaymentRequestDataLoading] = useState(false);
    const [data, setData] = useState<any>(null);
    const [paymentRequestData, setPaymentRequestData] = useState<any>(null);
    const history = useHistory();

    const appContext = React.useContext(AppContext);

    const fetchPaymentMethods = (orderId: string | undefined) => {
        const payload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                orderId
            })
        };

        setLoading(true);

        fetch('https://talpa-verkkokauppa-payment-experience-api-test.apps.arodevtest.hel.fi/get-payment-method-list', payload)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                setData(jsonResponse);
            }).finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        if (!loading)
            fetchPaymentMethods(appContext.subscriptionId);
    }, [appContext.subscriptionId, loading])

    const availablePaymentMethods: PaymentMethod[] = data || [];
    const initialSelectedMethod =
        (availablePaymentMethods.length && availablePaymentMethods[0].code) ||
        null;

    const getPaymentRequestData = useCallback(async () => {
        if (paymentRequestDataLoading) {
            return;
        }
        const payload = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                paymentMethod: currentSelectedPaymentMethod,
                orderId: appContext.subscriptionId
            })
        };

        setPaymentRequestDataLoading(true);

        fetch('https://talpa-verkkokauppa-payment-experience-api-test.apps.arodevtest.hel.fi/', payload)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonResponse) {
                setPaymentRequestData(jsonResponse);
            }).catch((err) => {
                console.error(
                    'An error occurred during when proceeding to payment',
                    err
                );
            }).finally(() => {
                setPaymentRequestDataLoading(false);
            })
    }, [
        appContext.subscriptionId,
        currentSelectedPaymentMethod,
        paymentRequestDataLoading
    ]);

    useEffect(() => {
        function proceedToPayment() {
            const url = paymentRequestData;
            setProceedToPaymentCalled(true);
            window.location.assign(url);
        }

        if (paymentRequestData && !proceedToPaymentCalled) {
            proceedToPayment();
        }
    }, [
        appContext.subscriptionId,
        paymentRequestData,
        proceedToPaymentCalled
    ]);

    useEffect(() => {
        return () => {
            setProceedToPaymentCalled(false);
        };
    }, [setProceedToPaymentCalled]);

    const goBack = () => {
        setProceedToPaymentCalled(false);
        history.goBack(); // TODO: ok?
    }

    return {
        availablePaymentMethods,
        currentSelectedPaymentMethod,
        initialSelectedMethod,
        setCurrentSelectedPaymentMethod,
        isLoading: loading,
        handleProceedToPayment: getPaymentRequestData,
        proceedToPaymentLoading: paymentRequestDataLoading,
        goBack
    };
}