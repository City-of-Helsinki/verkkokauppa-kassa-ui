import React, {FunctionComponent, useContext, useEffect, useState} from "react"
import { Footer } from "hds-react";
import Steps from "./Steps";
import {useOrder} from "../talons/checkout/useOrder"
import {AppActionsContext, AppContext} from "../context/Appcontext"
import {useHistory, useParams} from "react-router-dom"

type Props = {
  statusLabel: string;
  activeStep: number;
  steps: number;
};
export const StepContainer: FunctionComponent<Props> = (props) => {
  const { statusLabel, activeStep, steps } = props;
  const { fetchOrder } = useOrder();
  const history = useHistory();
  const { orderId } = useContext(AppContext);
  const { setOrderId, setOrder } = useContext(AppActionsContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    setOrderId(id);
    if (id) {
      fetchOrder(id).then((data) => {
        if (data.orderId) {
          setOrder(data)
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
