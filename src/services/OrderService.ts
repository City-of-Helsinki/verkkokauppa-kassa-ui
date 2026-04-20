import { PaymentMethod } from "../types/payment/types"
import { OrderInvoice } from "../types/invoice/types"
import { PaymentGateway } from "../enums/Payment"

export const isInvoiceOrder = (orderType: string, paymentMethod: PaymentMethod | undefined, invoice: OrderInvoice | undefined) => {
  return orderType !== "subscription" &&
    paymentMethod &&
    paymentMethod?.gateway === PaymentGateway.INVOICE &&
    invoice && invoice.businessId
}