import React, { useCallback, useContext, useState } from "react";
import { orderApiUrl } from "../../constants";
import useUser from "../header/useUser";

type CustomerProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const useCustomer = () => {
  const [loading, setLoading] = useState(false);
  const {user} = useUser();

  const setCustomer = async (p: { orderId: string } & CustomerProps) => {
    const {orderId, firstName, lastName, email, phone} = p
    if (loading) {
      return;
    }
    setLoading(true);
    await fetch(`${orderApiUrl}${orderId}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" , "user": `${user}`},
      body: JSON.stringify({
        customer: {
          firstName,
          lastName,
          email,
          phone
        },
      }),
    })
    setLoading(false);
  };
  return {
    setCustomer,
    loading,
  };
};
