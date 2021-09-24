import { useState } from "react";
import { merchantApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";


export const useMerchant = () => {
  const [ loading, setLoading ] = useState(false);

  const fetchMerchant = async (namespace: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.get(`${ merchantApiUrl }${ namespace }`)
      return response.data;
    } finally {
      setLoading(false)
    }
  };

  return {
    fetchMerchant,
    loading,
  };
};
