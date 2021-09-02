import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/Appcontext";
import { orderApiUrl, paymentApiUrl } from "../../constants";
import useLanguageSwitcher from "../header/useLanguageSwitcher";

type PaymentMethods = {
  [key: string]: PaymentMethod
}

interface PaymentMethod {
  name: string;
  code: string;
  group: string;
  img: string;
}

export const usePaymentMethods = () => {
  const [
    currentSelectedPaymentMethod,
    setCurrentSelectedPaymentMethod,
  ] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [proceedToPaymentCalled, setProceedToPaymentCalled] = useState(false);
  const [paymentRequestDataLoading, setPaymentRequestDataLoading] = useState(
    false
  );
  const [data, setData] = useState<any>(null);
  const [paymentRequestData, setPaymentRequestData] = useState<any>(null);
  const history = useHistory();
  const {currentLanguage} = useLanguageSwitcher();

  const appContext = React.useContext(AppContext);

  const fetchPaymentMethods = useCallback((orderId: string | undefined) => {
    setLoading(true);
    fetch(`${paymentApiUrl}${orderId}/paymentMethods`)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        setData(jsonResponse);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) fetchPaymentMethods(appContext.orderId);
  }, [appContext.orderId]);

  const availablePaymentMethods: PaymentMethods = data || [];
  const initialSelectedMethod =
    (Object.keys(availablePaymentMethods).length && availablePaymentMethods[0].code) || null;

  const getPaymentRequestData = useCallback(async () => {
    if (paymentRequestDataLoading) {
      return;
    }
    const payload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethod: currentSelectedPaymentMethod,
        language: currentLanguage,
      }),
    };

    setPaymentRequestDataLoading(true);

    fetch(`${orderApiUrl}${appContext.orderId}/confirmAndCreatePayment`, payload)
      .then(function (response) {
        return response.json();
      })
      .then(function (jsonResponse) {
        setPaymentRequestData(jsonResponse);
      })
      .catch((err) => {
        console.error(
          "An error occurred during when proceeding to payment",
          err
        );
      })
      .finally(() => {
        setPaymentRequestDataLoading(false);
      });
  }, [
    appContext.orderId,
    currentSelectedPaymentMethod,
    paymentRequestDataLoading,
  ]);

  useEffect(() => {
    function proceedToPayment() {
      const { payment: { paymentUrl } } = paymentRequestData;
      setProceedToPaymentCalled(true);
      window.location.assign(paymentUrl);
    }

    if (paymentRequestData && !proceedToPaymentCalled) {
      proceedToPayment();
    }
  }, [appContext.orderId, paymentRequestData, proceedToPaymentCalled]);

  useEffect(() => {
    return () => {
      setProceedToPaymentCalled(false);
    };
  }, [setProceedToPaymentCalled]);

  const goBack = () => {
    setProceedToPaymentCalled(false);
    history.goBack(); // TODO: ok?
  };

  return {
    availablePaymentMethods,
    currentSelectedPaymentMethod,
    initialSelectedMethod,
    setCurrentSelectedPaymentMethod,
    isLoading: loading,
    handleProceedToPayment: getPaymentRequestData,
    proceedToPaymentLoading: paymentRequestDataLoading,
    goBack,
  };
};
