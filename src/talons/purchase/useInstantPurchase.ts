import { useState } from "react";
import { orderApiUrl } from "../../constants";
import { InstantPurchaseProduct } from "../../types/instantPurchase/types";
import { MetaParameter } from "../../types/meta/types";

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
        setLoading(true);
        const response = await fetch(`${ orderApiUrl }instantPurchase`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                payload
            ),
        })
        const data = await response.json();
        setLoading(false);
        return data;
    };

    return {
        fetchInstantPurchase,
        loading,
        setLoading
    };
};
