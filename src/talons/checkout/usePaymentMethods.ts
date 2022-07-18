import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/Appcontext";
import { orderApiUrl, paymentApiUrl } from "../../constants";
import useLanguageSwitcher from "../header/useLanguageSwitcher";
import { axiosAuth } from "../../utils/axiosAuth";

type PaymentMethodGroup = {
  [group: string]: PaymentMethods
}

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
        //setData(response.data);
        setData({"online" : {"0":{"name":"Nordea","code":"nordea","group":"banks","img":"https://www.vismapay.com/e-payments/method_logos/nordea.png","gateway":"online"},"1":{"name":"Osuuspankki","code":"osuuspankki","group":"banks","img":"https://www.vismapay.com/e-payments/method_logos/osuuspankki.png","gateway":"online"},"2":{"name":"Visa","code":"creditcards","group":"creditcards","img":"https://www.vismapay.com/e-payments/method_logos/visa.png","gateway":"online"},"3":{"name":"Mastercard","code":"creditcards","group":"creditcards","img":"https://www.vismapay.com/e-payments/method_logos/mastercard.png","gateway":"online"}},"offline": {"0": {"name": "Helsinki lasku", "code": "helsinki-invoice", "group": "helsinki-invoice", "img": "helsinki-invoice.png"}}}        );
      })
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    if (!loading) fetchPaymentMethods(appContext.orderId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.orderId]);

  const availablePaymentMethods: PaymentMethodGroup = data || [];
  const initialSelectedMethod =
    (Object.keys(availablePaymentMethods).length && availablePaymentMethods["online"][0].code) || null;

  const getPaymentRequestData = useCallback(async () => {
    if (currentSelectedPaymentMethod == "helsinki-invoice") {
      window.location.assign("/"+appContext.orderId+"/invoice-details");
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
