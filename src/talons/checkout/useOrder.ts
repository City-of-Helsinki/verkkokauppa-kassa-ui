import {useState } from "react";
import { orderApiUrl } from "../../constants";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);

  const fetchOrder = async (orderId: string) => {
    if (loading) {
      return null;
    }
    setLoading(true);
    const response = await fetch(`${orderApiUrl}${orderId}`);
    const data = await response.json();
    setLoading(false);
    return data;
  };
  return {
    fetchOrder,
    loading,
  };
};
