import { useState } from "react";
import { orderApiUrl } from "../../constants";
import { InstantPurchaseProduct } from "../../types/instantPurchase/types";
import { MetaParameter } from "../../types/meta/types";
import { axiosAuth } from "../../utils/axiosAuth";

type InstantPurchaseProps = {
    products: InstantPurchaseProduct[];
    meta?: MetaParameter[];
    language: string
    namespace: string,
    user?: string,
};

export const useInstantPurchase = () => {
    const [loading, setLoading] = useState(false);

    const fetchInstantPurchase = async (payload: InstantPurchaseProps) => {
        if (loading) {
            return;
        }
        try {
            setLoading(true);
            const response = await axiosAuth.post(`${ orderApiUrl }instantPurchase`, payload)
            return response.data;
        } finally {
            setLoading(false)
        }
    };

    return {
        fetchInstantPurchase,
        loading,
        setLoading
    };
};
