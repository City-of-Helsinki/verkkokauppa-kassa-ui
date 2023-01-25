import { axiosAuth } from "../utils/axiosAuth";
import { orderApiUrl } from "../constants";
import { PaymentMethod } from "../types/payment/types";

export const savePaymentMethodToOrder = async (orderId: string, paymentMethod: PaymentMethod | undefined) => {
  return await axiosAuth.post<PaymentMethod>(`${ orderApiUrl }${ orderId }/paymentMethod`,
    {
      paymentMethod
    }
  );
};