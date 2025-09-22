import { PaymentMethod } from "../types/payment/types"
import { OrderInvoice } from "../types/invoice/types"
import { stringToArray } from "./StringUtils"
import { isInvoiceOrder } from "../services/OrderService"

export const showContractTerms = (namespace: string, orderType: string, paymentMethod: PaymentMethod | undefined, invoice: OrderInvoice | undefined) => {
  let skipTermsAcceptForNamespaces = stringToArray(process.env.REACT_APP_SKIP_TERMS_ACCEPT_FOR_NAMESPACES)
  const isSkipTermsAcceptForNameSpace = skipTermsAcceptForNamespaces.includes(namespace)

  const isSubscription = orderType === "subscription"
  const isInvoice = isInvoiceOrder(orderType, paymentMethod, invoice)
  const showTerms = !isSkipTermsAcceptForNameSpace || isSubscription || isInvoice
  return { isSkipTermsAcceptForNameSpace, isSubscription, isInvoice, showTerms }
}