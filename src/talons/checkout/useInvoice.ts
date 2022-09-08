import { useState } from "react";
import { orderApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";

type CustomerProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export const useInvoice = () => {
  const [loading, setLoading] = useState(false);

  const setCustomer = async (p: { orderId: string } & CustomerProps) => {
    const {orderId, firstName, lastName, email, phone} = p
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.post(`${ orderApiUrl }${ orderId }/customer`, {
        customer: {
          firstName,
          lastName,
          email,
          phone
        },
      })
      return response.data;
    } finally {
      setLoading(false)
    }
  };

  return {
    setCustomer,
    loading,
  };
};
