import { useState } from "react";
import { merchantApiUrl } from "../../constants";
import useUser from "../header/useUser";


export const useMerchant = () => {
  const [loading, setLoading] = useState(false);
  const {getUserHeader} = useUser();
  const userHeader = getUserHeader();
  const fetchMerchant = async (namespace: string) => {
    if (loading) {
      return null;
    }
    setLoading(true);
    const response = await fetch(`${ merchantApiUrl }${ namespace }`, userHeader);
    const data = await response.json();
    setLoading(false);
    return data;
  };
  return {
    fetchMerchant,
    loading,
  };
};
