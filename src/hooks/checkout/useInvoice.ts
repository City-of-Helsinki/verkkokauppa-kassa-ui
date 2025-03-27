import { useState } from "react";
import { orderApiUrl } from "../../constants";
import { axiosAuth } from "../../utils/axiosAuth";

export interface CreateOrderInvoice {
  orderId: string
  invoice: {
    invoiceId: string
    businessId: string
    name: string
    address: string
    postcode: string
    city: string
    ovtId?: string
  }
}

export const useInvoice = () => {
  const [loading, setLoading] = useState(false);

  const setInvoice = async (p: CreateOrderInvoice) => {
    const {
      orderId,
      invoice
    } = p
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      const response = await axiosAuth.post(`${ orderApiUrl }${ orderId }/invoice`, {
        invoice: invoice,
      })
      return response.data;
    } finally {
      setLoading(false)
    }
  };

  return {
    setInvoice,
    loading,
  };
};
