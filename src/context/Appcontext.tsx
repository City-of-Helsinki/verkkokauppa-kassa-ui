import React, {
  createContext,
  FunctionComponent,
  useMemo,
  useState,
} from "react";

type Order = {
  orderId: string;
  namespace: string;
  isValidForCheckout: boolean;
  items?: OrderItem[];
  priceNet?: string;
  priceVat?: string;
  priceTotal?: string;
  type: string;
  invoice?: OrderInvoice
  subscriptionId?: string;
};

type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type OrderMerchant = {
  merchantCity: string;
  merchantEmail: string;
  merchantName: string;
  merchantPhone: string;
  merchantStreet: string;
  merchantUrl: string;
  merchantZip: string;
};

interface OrderInvoice {
  invoiceId: string
  businessId: string
  name: string
  address: string
  postcode: string
  city: string
  ovtId?: string
}

type ExperienceMerchant = {
  merchantTermsOfServiceUrl: string;
} & OrderMerchant

type OrderItem = {
  productId: string;
  productName: string;
  productLabel: string;
  productDescription: string;
  quantity: number;
  unit: string;
  originalPriceGross: number;
  originalPriceNet: number;
  originalPriceVat: number;
  priceGross: number;
  priceNet: number;
  priceVat: number;
  rowPriceNet: number;
  rowPriceVat: number;
  rowPriceTotal: number;
  vatPercentage: number;
  orderItemId: string;
  orderId: string;
  meta: [];
}; 

type Payment = {
  paymentId: string;
  paymentMethodLabel: string;
  paymentType: string;
  status: string;
  total: string;
  timestamp: string;
};

type ContextProps = Order &
  OrderCustomer & OrderMerchant & Payment & ExperienceMerchant & {
    name: string;
  };


type ContextActions = {
  setOrderId: (p: string) => any;
  setNamespace: (p: string) => any;
  setIsValidForCheckout : (p: boolean) => any;
  setFirstName: (p: string) => any;
  setLastName: (p: string) => any;
  setEmail: (p: string) => any;
  setPhone: (p: string) => any;
  setItems: (p: OrderItem[]) => any;
  setInvoice: (p: OrderInvoice) => any;
  setOrder: (p: Order & { customer: OrderCustomer } & { merchant: OrderMerchant }) => any;
  setPriceNet: (p: string) => any;
  setPriceVat: (p: string) => any;
  setPriceTotal: (p: string) => any;
  setType: (p: string) => any;
  setSubscriptionId: (p: string) => any;

  setPayment: (p: Payment) => any;
  setPaymentId: (p: string) => any;
  setPaymentMethodLabel: (p: string) => any;
  setPaymentType: (p: string) => any;
  setStatus: (p: string) => any;
  setTotal: (p: string) => any;
  setTimestamp: (p: string) => any;

  setMerchantCity: (p: string) => any;
  setMerchantEmail: (p: string) => any;
  setMerchantName: (p: string) => any;
  setMerchantPhone: (p: string) => any;
  setMerchantStreet: (p: string) => any;
  setMerchantUrl: (p: string) => any;
  setMerchantZip: (p: string) => any;
  setMerchantTermsOfServiceUrl: (p: string) => any;
  setMerchantFromConfiguration: (p: ExperienceMerchant) => any;
};

export const AppContext = createContext<ContextProps>({
  email: "",
  firstName: "",
  items: [],
  lastName: "",
  name: "",
  orderId: "",
  namespace: "",
  isValidForCheckout: false,
  phone: "",
  paymentId: "",
  paymentMethodLabel: "",
  paymentType: "",
  status: "",
  total: "",
  timestamp: "",
  type: "",
  subscriptionId: "",
  merchantCity: "",
  merchantEmail: "",
  merchantName: "",
  merchantPhone: "",
  merchantStreet: "",
  merchantUrl: "",
  merchantZip: "",
  merchantTermsOfServiceUrl: "",
  invoice: {
    invoiceId: "",
    businessId: "",
    name: "",
    address: "",
    postcode: "",
    city: "",
    ovtId: ""
  },
});

export const AppActionsContext = createContext<ContextActions>({
  setOrderId: () => {
    throw new Error("No setOrderId specified");
  },
  setNamespace: () => {
    throw new Error("No setNamespace specified");
  },
  setIsValidForCheckout: () => {
    throw new Error("No setIsValidForCheckout specified");
  },
  setFirstName: () => {
    throw new Error("No setFirstName specified");
  },
  setLastName: () => {
    throw new Error("No setLastName specified");
  },
  setEmail: () => {
    throw new Error("No setEmail specified");
  },
  setPhone: () => {
    throw new Error("No setPhone specified");
  },
  setItems: () => {
    throw new Error("No setItems specified");
  },
  setOrder: () => {
    throw new Error("No setOrder specified");
  },
  setPriceNet: () => {
    throw new Error("No setPriceNet specified");
  },
  setPriceVat: () => {
    throw new Error("No setPriceVat specified");
  },
  setPriceTotal: () => {
    throw new Error("No setPriceTotal specified");
  },
  setType: () => {
    throw new Error("No setType specified");
  },
  setSubscriptionId: () => {
    throw new Error("No setSubscriptionId specified");
  },
  setPayment: () => {
    throw new Error("No setPayment specified");
  },
  setPaymentId: () => {
    throw new Error("No setPaymentId specified");
  },
  setPaymentMethodLabel: () => {
    throw new Error("No setPaymentMethodLabel specified");
  },
  setPaymentType: () => {
    throw new Error("No setPaymentType specified");
  },
  setStatus: () => {
    throw new Error("No setStatus specified");
  },
  setTotal: () => {
    throw new Error("No setTotal specified");
  },
  setTimestamp: () => {
    throw new Error("No setTimestamp specified");
  },
  setMerchantCity: () => {
    throw new Error("No setMerchantCity specified");
  },
  setMerchantEmail: () => {
    throw new Error("No setMerchantEmail specified");
  },
  setMerchantName: () => {
    throw new Error("No setMerchantName specified");
  },
  setMerchantPhone: () => {
    throw new Error("No setMerchantPhone specified");
  },
  setMerchantStreet: () => {
    throw new Error("No setMerchantStreet specified");
  },
  setMerchantUrl: () => {
    throw new Error("No setMerchantUrl specified");
  },
  setMerchantZip: () => {
    throw new Error("No setMerchantZip specified");
  },
  setMerchantTermsOfServiceUrl: () => {
    throw new Error("No setMerchantTermsOfServiceUrl specified");
  },
  setMerchantFromConfiguration: () => {
    throw new Error("No setMerchantFromConfiguration specified");
  },
  setInvoice: () => {
    throw new Error("No setInvoice specified");
  },
});

const AppContextProvider: FunctionComponent = (props) => {
  const [name] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [namespace, setNamespace] = useState("");
  const [isValidForCheckout, setIsValidForCheckout] = useState(true);
  const [items, setItems] = useState<OrderItem[]>([]);

  const [invoice, setInvoice] = useState<OrderInvoice>( {
    invoiceId: "",
    businessId: "",
    name: "",
    address: "",
    postcode: "",
    city: "",
    ovtId: ""
  });
  const [priceNet, setPriceNet] = useState("");
  const [priceVat, setPriceVat] = useState("");
  const [priceTotal, setPriceTotal] = useState("");
  const [type, setType] = useState("");
  const [subscriptionId, setSubscriptionId] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentMethodLabel, setPaymentMethodLabel] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [merchantCity, setMerchantCity] = useState("");
  const [merchantTermsOfServiceUrl, setMerchantTermsOfServiceUrl] = useState("");
  const [merchantEmail, setMerchantEmail] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [merchantPhone, setMerchantPhone] = useState("");
  const [merchantStreet, setMerchantStreet] = useState("");
  const [merchantUrl, setMerchantUrl] = useState("");
  const [merchantZip, setMerchantZip] = useState("");

  const setOrder = (p: Order & { customer: OrderCustomer } & { merchant: OrderMerchant }) => {
    const {
      items,
      invoice,
      type,
      subscriptionId: orderSubscriptionId,
      customer,
      merchant,
      isValidForCheckout,
      priceNet: orderPriceNet,
      priceVat: orderPriceVat,
      priceTotal: orderPriceTotal,
      namespace
    } = p;

    setItems(items || []);

    setType(type);
    setIsValidForCheckout(isValidForCheckout);
    setNamespace(namespace);

    if (invoice) {
      setInvoice(invoice)
    }

    if (customer) {
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setEmail(customer.email);
      setPhone(customer.phone);
    }
    if (merchant) {
      setMerchantCity(merchant.merchantCity);
      setMerchantEmail(merchant.merchantEmail);
      setMerchantName(merchant.merchantName);
      setMerchantPhone(merchant.merchantPhone);
      setMerchantStreet(merchant.merchantStreet);
      setMerchantUrl(merchant.merchantUrl);
      setMerchantZip(merchant.merchantZip);
    }
    if (orderPriceNet && orderPriceVat && orderPriceTotal) {
      setPriceNet(orderPriceNet);
      setPriceVat(orderPriceVat);
      setPriceTotal(orderPriceTotal);
    }

    if (orderSubscriptionId) {
      setSubscriptionId(orderSubscriptionId);
    }
  };

  const setMerchantFromConfiguration = (merchantConfiguration: ExperienceMerchant) => {
    setMerchantTermsOfServiceUrl(merchantConfiguration.merchantTermsOfServiceUrl || '')
  }
  
  const setPayment = (p: Payment) => {
    const {
      paymentId,
      paymentMethodLabel,
      paymentType,
      status,
      total,
      timestamp
    } = p;

    if (paymentId && paymentMethodLabel && paymentType && status && total) {
      setPaymentId(paymentId);
      setPaymentMethodLabel(paymentMethodLabel);
      setPaymentType(paymentType);
      setStatus(status);
      setTotal(total);
      setTimestamp(timestamp);
    }
  };

  const value = useMemo(
    () => ({
      name,
      firstName,
      lastName,
      email,
      phone,
      orderId,
      namespace,
      isValidForCheckout,
      items,
      priceNet,
      priceVat,
      priceTotal,
      type,
      subscriptionId,
      paymentId,
      paymentMethodLabel,
      paymentType,
      status,
      total,
      timestamp,
      merchantCity,
      merchantEmail,
      merchantName,
      merchantPhone,
      merchantStreet,
      merchantUrl,
      merchantZip,
      merchantTermsOfServiceUrl,
      invoice
    }),
    [
      name,
      firstName,
      lastName,
      email,
      phone,
      orderId,
      namespace,
      isValidForCheckout,
      items,
      priceNet,
      priceVat,
      priceTotal,
      type,
      subscriptionId,
      paymentId,
      paymentMethodLabel,
      paymentType,
      status,
      total,
      timestamp,
      merchantCity,
      merchantEmail,
      merchantName,
      merchantPhone,
      merchantStreet,
      merchantUrl,
      merchantZip,
      merchantTermsOfServiceUrl,
      invoice
    ]
  );

  return (
    <AppContext.Provider value={value}>
      <AppActionsContext.Provider
        value={{
          setFirstName,
          setLastName,
          setEmail,
          setPhone,
          setOrderId,
          setIsValidForCheckout,
          setItems,
          setOrder,
          setNamespace,
          setPriceNet,
          setPriceVat,
          setPriceTotal,
          setType,
          setSubscriptionId,
          setPayment,
          setPaymentId,
          setPaymentMethodLabel,
          setPaymentType,
          setStatus,
          setTotal,
          setTimestamp,
          setMerchantCity,
          setMerchantEmail,
          setMerchantName,
          setMerchantPhone,
          setMerchantStreet,
          setMerchantUrl,
          setMerchantZip,
          setMerchantTermsOfServiceUrl,
          setMerchantFromConfiguration,
          setInvoice
        }}
      >
        {props.children}
      </AppActionsContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
