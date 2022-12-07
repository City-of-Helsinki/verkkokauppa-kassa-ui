import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/Appcontext";
import { orderApiUrl, paymentApiUrl } from "../../constants";
import useLanguageSwitcher from "../header/useLanguageSwitcher";
import { axiosAuth } from "../../utils/axiosAuth";
import { PaymentGateway } from "../../enums/Payment";

export type PaymentMethods = {
  [key: string]: PaymentMethod
}

interface PaymentMethod {
  name: string;
  code: string;
  group: string;
  img: string;
  gateway: string;
}

export const usePaymentMethods = () => {
  const [
    currentSelectedPaymentMethod,
    setCurrentSelectedPaymentMethod,
  ] = useState<string | null>(null);
  const [
    currentSelectedPaymentMethodGateway,
    setCurrentSelectedPaymentMethodGateway,
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
          gateway: currentSelectedPaymentMethodGateway
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
  }, [appContext.orderId, currentLanguage, currentSelectedPaymentMethod, currentSelectedPaymentMethodGateway, paymentRequestDataLoading]);

  useEffect(() => {
    function proceedToPayment() {
      const { payment: { paymentUrl, paymentGateway, paytrailProvider } } = paymentRequestData;
      console.log(paymentRequestData)
      setProceedToPaymentCalled(true);
      // Sets loading spinner to show before reloading
      setLoading(true)

      if (paymentGateway === PaymentGateway.PAYTRAIL.toString()) {

        const paytrailForm = document.createElement('form');

        paytrailForm.setAttribute('method', 'POST')
        paytrailForm.setAttribute('action', paytrailProvider.url)
        paytrailForm.setAttribute('hidden', 'true')
        paytrailProvider.parameters.forEach(
          // @ts-ignore
          (param) => {
            const inputElement = document.createElement('input');
            inputElement.setAttribute('type', 'hidden');
            inputElement.setAttribute('name', param.name);
            inputElement.setAttribute('value', param.value);
            paytrailForm.appendChild(inputElement)
          }
        );

        document.body.appendChild(paytrailForm);
        paytrailForm.submit();
      }

      // Added fallback to visma if empty payment gateway
      if (paymentGateway === PaymentGateway.VISMA.toString() || !paymentGateway) {
        // Using location.href because it faster than assign
        window.location.href = paymentUrl;
      }

      setTimeout(() => {
        // Acts as fallback if redirecting takes too long to set loading to false after 1,5 seconds to allow retry
        console.log(`Redirecting failed to ${ paymentUrl } payment gateway ${ paymentGateway } request data ${paymentRequestData}`)
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
    currentSelectedPaymentMethodGateway,
    setCurrentSelectedPaymentMethodGateway,
    initialSelectedMethod,
    setCurrentSelectedPaymentMethod,
    isLoading: loading,
    handleProceedToPayment: getPaymentRequestData,
    proceedToPaymentLoading: paymentRequestDataLoading,
    goBack,
  };
};
