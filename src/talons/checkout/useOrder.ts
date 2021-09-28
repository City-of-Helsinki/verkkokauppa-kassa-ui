import { useState } from "react";
import { orderApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";
import { useHistory } from "react-router";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchOrder = async (orderId: string) => {
    const test = {} as any
    console.log(test.testi.asd)
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

  const cancelOrder = async (orderId: string) => {
    if (loading) {
      return null;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.post(`${ orderApiUrl }${ orderId }/cancel`);
      return response.data;
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchOrder,
    loading,
    cancelOrder
  };
};
