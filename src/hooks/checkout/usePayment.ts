import { useState } from "react";
import { paymentApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";

export const usePayment = () => {
  const [ loading, setLoading ] = useState(false);

  const fetchPayment = async (orderId: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.get(`${ paymentApiUrl }${ orderId }`)
      return response.data;
    } finally {
      setLoading(false)
    }
  };

  return {
    fetchPayment,
    loading,
  };
};
