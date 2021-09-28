import React, {FunctionComponent, useContext, useEffect, useState} from "react"
import { Footer } from "hds-react";
import Steps from "./Steps";
import {useOrder} from "../talons/checkout/useOrder"
import {AppActionsContext, AppContext} from "../context/Appcontext"
import {useHistory, useParams} from "react-router-dom"
import { useMerchant } from "../talons/checkout/useMerchant";
import { getSearchParam } from "../hooks/useSearchParam";
import useUser from "../talons/header/useUser";

type Props = {
  statusLabel: string;
  activeStep: number;
  steps: number;
};
export const StepContainer: FunctionComponent<Props> = (props) => {
  const { statusLabel, activeStep, steps } = props;
  const { fetchOrder, loading: orderLoading } = useOrder();
  const { fetchMerchant, loading: merchantLoading } = useMerchant();
  const history = useHistory();
  const { orderId } = useContext(AppContext);
  const { setOrderId, setOrder,setMerchantFromConfiguration } = useContext(AppActionsContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const userParameter = getSearchParam("user");
  const { user, setOrGenerateUserId } = useUser();

  useEffect(() => {
    if (userParameter !== "" && !user) {
      setOrGenerateUserId(userParameter)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    setOrderId(id);
    if (id) {
      fetchOrder(id).then((data) => {
        if (orderLoading) {
          setLoading(true)
          return
        }
        if (null !== data && typeof data !== "undefined" && data.orderId) {
          setOrder(data)
          fetchMerchant(data.namespace).then((data) => {
            if (merchantLoading) {
              return
            }
            setMerchantFromConfiguration(data);
          });
        } else {
          history.push("/");
        }
        setLoading(false)
      });


    }
  }, [id, orderId, activeStep]);
  return (
    <>
      <Steps statusLabel={statusLabel} activeStep={activeStep} steps={steps} />
      {!loading && props.children}
    </>
  );
};

export default StepContainer;
