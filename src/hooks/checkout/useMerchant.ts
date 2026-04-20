import { useState } from "react";
import { merchantApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";


export const useMerchant = () => {
  const [ loading, setLoading ] = useState(false);

  const fetchMerchant = async (namespace: string, merchantId?: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      let url = `${ merchantApiUrl }${ namespace }`;
      if (merchantId) {
        url = `${ merchantApiUrl }${ namespace }/${ merchantId }`;
      }
      const response = await axiosAuth.get(url);
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
