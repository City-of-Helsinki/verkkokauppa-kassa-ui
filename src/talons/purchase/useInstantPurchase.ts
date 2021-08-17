import {useState} from "react";
import {orderApiUrl} from "../../constants";
import {InstantPurchaseProduct} from "../../types/instantPurchase/types";

type InstantPurchaseProps = {
    products: InstantPurchaseProduct[];
    language: string
    namespace: string,
    user: string,
};

export const useInstantPurchase = () => {
    const [loading, setLoading] = useState(false);

    const fetchInstantPurchase = async (payload: InstantPurchaseProps) => {
        const {
            products: [{productId}],
        } = payload;

        if (loading) {
            return;
        }
        setLoading(true);
        const response = await fetch(`${orderApiUrl}/purchase/${productId}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
    };
};
