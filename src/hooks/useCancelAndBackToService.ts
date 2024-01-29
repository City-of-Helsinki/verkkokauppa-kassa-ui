import { useOrder } from "../talons/checkout/useOrder"
import { useHistory } from "react-router-dom"

export default function useCancelAndBackToService(
  orderId: string,
  merchantUrl: string
  ) {
  const { cancelOrder } = useOrder();
  const history = useHistory();
  
  const cancelAndBackToService = () => {
    cancelOrder(orderId).then((data) => {
      if (null !== data && typeof data !== "undefined" && data.cancelUrl) {
        window.location.replace(data.cancelUrl);
      } else if (merchantUrl) {
        window.location.replace(merchantUrl);
      } else {
        history.push("/"); //TODO: Where to redirect if no service url available?
      }
    });
  };

  return {
    cancelAndBackToService
  }
}