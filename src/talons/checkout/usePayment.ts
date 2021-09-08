import {useState } from "react";
import { paymentApiUrl } from "../../constants";
import useUser from "../header/useUser";

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const {getUserHeader} = useUser();

  const fetchPayment = async (orderId: string) => {
    if (loading) {
      return null;
    }
    setLoading(true);
    const response = await fetch(`${ paymentApiUrl }${ orderId }`, getUserHeader());
    const data = await response.json();
    setLoading(false);
    return data;
  };
  return {
    fetchPayment,
    loading,
  };
};
