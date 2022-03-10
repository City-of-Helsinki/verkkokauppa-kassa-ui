import { useState } from "react";
import { paymentApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";

export const useUpdateCard = () => {
  const [ loading, setLoading ] = useState(false);

  const fetchUpdateCardPaymentUrl = async (subscriptionId: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.get(`${ paymentApiUrl }/subscription/${ subscriptionId }/tokenize`)
      return response.data;
    } finally {
      setLoading(false)
    }
  };

  return {
    fetchUpdateCardPaymentUrl,
    loading,
  };
};
