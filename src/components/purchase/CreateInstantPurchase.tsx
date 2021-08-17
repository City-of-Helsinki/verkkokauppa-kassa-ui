import React, { FunctionComponent, useEffect } from 'react';
import { getSearchParam } from "../../hooks/useSearchParam";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useInstantPurchase } from "../../talons/purchase/useInstantPurchase";
import { v4 as uuidv4 } from 'uuid';

interface OwnProps {
}

type Props = OwnProps;

const CreateInstantPurchase: FunctionComponent<Props> = (props) => {
    const { id: productId } = useParams();
    const { fetchInstantPurchase, loading } = useInstantPurchase();
    const history = useHistory();
    const location = useLocation();

    let userSearchParam = getSearchParam("user", location);
    const user = userSearchParam === '' ? uuidv4() : userSearchParam;

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const language = getSearchParam("language");

        const payload = {
            "products": [
                {
                    "productId": `${ productId }`,
                    "unit": "pcs",
                    "quantity": Number.parseInt(getSearchParam("quantity", location))
                }
            ],
            "language": `${ language }`,
            "namespace": `${ getSearchParam("namespace", location) }`,
            "user": `${ user }`
        };

        fetchInstantPurchase(payload).then((data) => {
            if (loading) {
                return
            }
            if (data.orderId !== "undefined") {
                history.push(`/${ data.orderId }?lang=${ language }`);
            } else {
                history.push("/");
            }
        });
    }, []);
    return (<></>);
};

export default CreateInstantPurchase;
