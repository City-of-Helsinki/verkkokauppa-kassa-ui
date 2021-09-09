import {useState } from "react";
import { orderApiUrl } from "../../constants";
import useUser from "../header/useUser";

export const useOrder = () => {
  const [loading, setLoading] = useState(false);
  const {getUserHeader} = useUser();
  const userHeader = getUserHeader();
  const fetchOrder = async (orderId: string) => {
    if (loading) {
      return null;
    }
    setLoading(true);
    const response = await fetch(`${ orderApiUrl }${ orderId }`, userHeader);
    const data = await response.json();
    setLoading(false);
    return data;
  };
  const cancelOrder = async (orderId: string) => {
    if (loading) {
      return null;
    }
    setLoading(true);
    const response = await fetch(`${orderApiUrl}${orderId}/cancel`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'user': `${userHeader.headers.get('user')}`
      }
    });
    const data = await response.json();
    setLoading(false)
    return data;
  }
  return {
    fetchOrder,
    loading,
    cancelOrder
  };
};
