import { useState } from "react";
import { orderApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";
import { useHistory } from "react-router";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchOrder = async (orderId: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.get(`${ orderApiUrl }${ orderId }`)
      return response.data;
    } catch (e) {
      history.push('/')
    } finally {
      setLoading(false);
    }
  };

  const getCancelUrl = async (orderId: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.get(`${ orderApiUrl }${ orderId }/getCancelUrl`);
      return response.data;
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchOrder,
    loading,
    getCancelUrl
  };
};
