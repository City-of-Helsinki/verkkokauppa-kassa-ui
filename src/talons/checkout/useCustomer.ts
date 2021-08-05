import React, { useCallback, useContext, useState } from "react";
import { orderApiUrl } from "../../constants";

type CustomerProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const useCustomer = () => {
  const [loading, setLoading] = useState(false);

  const setCustomer = async (p: { orderId: string } & CustomerProps) => {
    const {orderId, firstName, lastName, email} = p
    if (loading) {
      return;
    }
    setLoading(true);
    await fetch(`${orderApiUrl}${orderId}/customer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          firstName: firstName,
          lastName: lastName,
          email: email,
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
