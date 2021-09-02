import React, {
  createContext,
  FunctionComponent,
  useMemo,
  useState,
} from "react";

type Order = {
  orderId: string;
  items?: OrderItem[];
  priceNet?: string;
  priceVat?: string;
  priceTotal?: string;
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
}

type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  rowPriceNet: number;
  rowPriceVat: number;
  rowPriceTotal: number;
  orderItemId: string;
  orderId: string;
};

type Payment = {
  paymentId: string;
  paymentMethod: string;
  paymentType: string;
  status: string;
  total: string;
  timestamp: string;
};

type ContextProps = Order &
  OrderCustomer & OrderMerchant & Payment & {
    name: string;
  };


type ContextActions = {
  setOrderId: (p: string) => any;
  setFirstName: (p: string) => any;
  setLastName: (p: string) => any;
  setEmail: (p: string) => any;
  setPhone: (p: string) => any;
  setItems: (p: OrderItem[]) => any;
  setOrder: (p: Order & { customer: OrderCustomer } & { merchant: OrderMerchant }) => any;
  setPriceNet: (p: string) => any;
  setPriceVat: (p: string) => any;
  setPriceTotal: (p: string) => any;

  setPayment: (p: Payment) => any;
  setPaymentId: (p: string) => any;
  setPaymentMethod: (p: string) => any;
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
};

export const AppContext = createContext<ContextProps>({
  email: "",
  firstName: "",
  items: [],
  lastName: "",
  name: "",
  orderId: "",
  phone: "",
  paymentId: "",
  paymentMethod: "",
  paymentType: "",
  status: "",
  total: "",
  timestamp: "",
  merchantCity: "",
  merchantEmail: "",
  merchantName: "",
  merchantPhone: "",
  merchantStreet: "",
  merchantUrl: "",
  merchantZip: "",
});

export const AppActionsContext = createContext<ContextActions>({
  setOrderId: () => {
    throw new Error("No setOrderId specified");
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
  setPayment: () => {
    throw new Error("No setPayment specified");
  },
  setPaymentId: () => {
    throw new Error("No setPaymentId specified");
  },
  setPaymentMethod: () => {
    throw new Error("No setPaymentMethod specified");
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
});

const AppContextProvider: FunctionComponent = (props) => {
  const [name] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [priceNet, setPriceNet] = useState("");
  const [priceVat, setPriceVat] = useState("");
  const [priceTotal, setPriceTotal] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [status, setStatus] = useState("");
  const [total, setTotal] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [merchantCity, setMerchantCity] = useState("");
  const [merchantEmail, setMerchantEmail] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [merchantPhone, setMerchantPhone] = useState("");
  const [merchantStreet, setMerchantStreet] = useState("");
  const [merchantUrl, setMerchantUrl] = useState("");
  const [merchantZip, setMerchantZip] = useState("");

  const setOrder = (p: Order & { customer: OrderCustomer } & { merchant: OrderMerchant }) => {
    const {
      items,
      customer,
      merchant,
      priceNet: orderPriceNet,
      priceVat: orderPriceVat,
      priceTotal: orderPriceTotal,
    } = p;
    setItems(items || []);
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
  };

  const setPayment = (p: Payment) => {
    const {
      paymentId,
      paymentMethod,
      paymentType,
      status,
      total,
      timestamp
    } = p;

    if (paymentId && paymentMethod && paymentType && status && total) {
      setPaymentId(paymentId);
      setPaymentMethod(paymentMethod);
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
      items,
      priceNet,
      priceVat,
      priceTotal,
      paymentId,
      paymentMethod,
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
    }),
    [
      name,
      firstName,
      lastName,
      email,
      phone,
      orderId,
      items,
      priceNet,
      priceVat,
      priceTotal,
      paymentId,
      paymentMethod,
      paymentType,
      status,
      total,
      timestamp,
      merchantEmail,
      merchantName,
      merchantPhone,
      merchantStreet,
      merchantUrl,
      merchantZip,
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
          setItems,
          setOrder,
          setPriceNet,
          setPriceVat,
          setPriceTotal,
          setPayment,
          setPaymentId,
          setPaymentMethod,
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
        }}
      >
        {props.children}
      </AppActionsContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
