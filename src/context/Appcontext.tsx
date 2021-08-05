import React, {
  createContext,
  FunctionComponent,
  useMemo,
  useState,
} from "react";

type Order = {
  orderId: string;
  items?: OrderItem[];
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
  setOrderId: (p: any) => any;
  setFirstName: (p: any) => any;
  setLastName: (p: any) => any;
  setEmail: (p: any) => any;
  setPhone: (p: any) => any;
  setItems: (p: OrderItem[]) => any;
  setOrder: (p: Order & { customer: OrderCustomer }) => any;
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
});

const AppContextProvider: FunctionComponent = (props) => {
  const [name] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderId, setOrderId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);

  const setOrder = (p: Order & { customer: OrderCustomer }) => {
    const { items, customer } = p;
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    setEmail(customer.email);
    setPhone(customer.phone);
    setItems(items || []);
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
    }),
    [name, firstName, lastName, email, phone, orderId, items]
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
        }}
      >
        {props.children}
      </AppActionsContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
