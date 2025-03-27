import { PaymentMethod } from "../types/payment/types"
import { OrderInvoice } from "../types/invoice/types"

export const isInvoiceOrder = (orderType: string, paymentMethod: PaymentMethod | undefined, invoice: OrderInvoice | undefined) => {
  return orderType !== "subscription" &&
    paymentMethod &&
    paymentMethod?.code.toLowerCase() === "invoice" &&
    invoice && invoice.businessId
}