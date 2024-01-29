import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/Appcontext";
import { orderApiUrl, paymentApiUrl } from "../../constants";
import useLanguageSwitcher from "../header/useLanguageSwitcher";
import { axiosAuth } from "../../utils/axiosAuth";
import { PaymentGateway } from "../../enums/Payment";
import { PaymentMethod } from "../../types/payment/types";
import { savePaymentMethodToOrder } from "../../services/PaymentMethod";

type PaymentMethodGroup = {
  [group: string]: PaymentMethods
}

export type PaymentMethods = {
  [key: string]: PaymentMethod
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

  const [ paymentMethod, setPaymentMethod ] = useState<PaymentMethod>();

  const [ loading, setLoading ] = useState(false);
  const [ proceedToPaymentCalled, setProceedToPaymentCalled ] = useState(false);
  const [ paymentRequestDataLoading, setPaymentRequestDataLoading ] = useState(
    false
  );
  const [ data, setData ] = useState<any>(null);
  const [ paymentRequestData, setPaymentRequestData ] = useState<any>(null);
  const history = useHistory();
  const { currentLanguage } = useLanguageSwitcher();
  const appContext = React.useContext(AppContext);

  const fetchPaymentMethods = useCallback((orderId: string | undefined) => {
    try {
      setLoading(true);
      axiosAuth.get(`${ paymentApiUrl }${ orderId }/paymentMethods`).then(response => {
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
  }, [ appContext.orderId ]);

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

      // TODO add redirect and fetch

      const response = await axiosAuth.post(`${ orderApiUrl }${ appContext.orderId }/confirmAndCreatePayment`,
        {
          paymentMethod: appContext.paymentMethod?.code,
          language: currentLanguage,
          gateway: appContext.paymentMethod?.gateway
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
  }, [appContext.orderId, currentLanguage, currentSelectedPaymentMethod, currentSelectedPaymentMethodGateway]);

  const savePaymentMethodAndRedirect = useCallback(async () => {
    if (paymentRequestDataLoading) {
      return;
    }

    try {
      setPaymentRequestDataLoading(true);
      await savePaymentMethodToOrder(appContext.orderId, paymentMethod)
    } catch (e) {
      console.error(
        "An error occurred during when proceeding to payment",
        e
      );
    } finally {
      setPaymentRequestDataLoading(false)
    }
  }, [appContext.orderId, paymentMethod, paymentRequestDataLoading]);


  useEffect(() => {
    function proceedToPayment() {
      const { payment: { paymentUrl, paymentGateway, paytrailProvider } } = paymentRequestData;
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
        console.log(`Redirecting failed to ${ paymentUrl } payment gateway ${ paymentGateway } request data ${ paymentRequestData }`)
        setLoading(false)
      }, 1500);
    }

    if (paymentRequestData && !proceedToPaymentCalled) {
      proceedToPayment();
    }
  }, [ appContext.orderId, paymentRequestData, proceedToPaymentCalled ]);

  useEffect(() => {
    return () => {
      setProceedToPaymentCalled(false);
    };
  }, [ setProceedToPaymentCalled ]);

  const goBack = () => {
    setProceedToPaymentCalled(false);
    history.goBack(); // TODO: ok?
  };

  return {
    availablePaymentMethods,
    currentSelectedPaymentMethod,
    paymentMethod,
    setPaymentMethod,
    currentSelectedPaymentMethodGateway,
    setCurrentSelectedPaymentMethodGateway,
    initialSelectedMethod,
    setCurrentSelectedPaymentMethod,
    isLoading: loading,
    handleProceedToPayment: getPaymentRequestData,
    savePaymentMethod: savePaymentMethodAndRedirect,
    proceedToPaymentLoading: paymentRequestDataLoading,
    goBack,
  };
};
