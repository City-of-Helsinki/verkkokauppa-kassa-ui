import {useState } from "react";
import { paymentApiUrl } from "../../constants";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);

  const fetchPayment = async (orderId: string) => {
    if (loading) {
      return null;
    }
    setLoading(true);
    const response = await fetch(`${paymentApiUrl}${orderId}`);
    const data = await response.json();
    setLoading(false);
    return data;
  };
  return {
    fetchPayment,
    loading,
  };
};
