import { useOrder } from "../talons/checkout/useOrder"
import { useHistory } from "react-router-dom"

export default function useGetCancelUrlAndRedirectBackToService(
  orderId: string,
  merchantUrl: string
  ) {
  const { getCancelUrl } = useOrder();
  const history = useHistory();
  
  const getCancelUrlAndRedirectBackToService = () => {
    getCancelUrl(orderId).then((data) => {
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
    getCancelUrlAndRedirectBackToService
  }
}