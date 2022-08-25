import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/Appcontext";
import { orderApiUrl, paymentApiUrl } from "../../constants";
import useLanguageSwitcher from "../header/useLanguageSwitcher";
import { axiosAuth } from "../../utils/axiosAuth";

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

  const fetchPaymentMethods = useCallback( (orderId: string | undefined) => {
    try {
      setLoading(true);
      axiosAuth.get(`${paymentApiUrl}${orderId}/paymentMethods`).then(response => {
        setData(response.data);
      })
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    if (!loading) fetchPaymentMethods(appContext.orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.orderId]);

  const availablePaymentMethods: PaymentMethods = data || [];
  const initialSelectedMethod =
    (Object.keys(availablePaymentMethods).length && availablePaymentMethods[0].code) || null;

  const getPaymentRequestData = useCallback(async () => {
    if (paymentRequestDataLoading) {
      return;
    }

    try {
      setPaymentRequestDataLoading(true);
      const response = await axiosAuth.post(`${ orderApiUrl }${ appContext.orderId }/confirmAndCreatePayment`,
        {
          paymentMethod: currentSelectedPaymentMethod,
          language: currentLanguage,
        }
        );
      setPaymentRequestData(response.data);
    } catch (e) {
      console.error(
        "An error occurred during when proceeding to payment",
        e
      );
    } finally {
      setPaymentRequestDataLoading(false)
    }
  }, [appContext.orderId, currentLanguage, currentSelectedPaymentMethod, paymentRequestDataLoading]);

  useEffect(() => {
    function proceedToPayment() {
      const { payment: { paymentUrl } } = paymentRequestData;
      setProceedToPaymentCalled(true);
      // Sets loading spinner to show before reloading
      setLoading(true)
      // Using location.href because it faster than assign
      window.location.href = paymentUrl;

      setTimeout(() => {
        // Acts as fallback if redirecting takes too long to set loading to false after 1,5 seconds to allow retry
        setLoading(false)
      }, 1500);


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
