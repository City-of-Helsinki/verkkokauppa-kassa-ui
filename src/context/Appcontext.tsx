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

type ContextProps = Order &
  OrderCustomer & {
    name: string;
  };

type ContextActions = {
  setOrderId: (p: string) => any;
  setFirstName: (p: string) => any;
  setLastName: (p: string) => any;
  setEmail: (p: string) => any;
  setPhone: (p: string) => any;
  setItems: (p: OrderItem[]) => any;
  setOrder: (p: Order & { customer: OrderCustomer }) => any;
  setPriceNet: (p: string) => any;
  setPriceVat: (p: string) => any;
  setPriceTotal: (p: string) => any;
};

export const AppContext = createContext<ContextProps>({
  email: "",
  firstName: "",
  items: [],
  lastName: "",
  name: "",
  orderId: "",
  phone: "",
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

  const setOrder = (p: Order & { customer: OrderCustomer }) => {
    const {
      items,
      customer,
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
    if (orderPriceNet && orderPriceVat && orderPriceTotal) {
      setPriceNet(orderPriceNet);
      setPriceVat(orderPriceVat);
      setPriceTotal(orderPriceTotal);
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
          setPriceTotal
        }}
      >
        {props.children}
      </AppActionsContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
