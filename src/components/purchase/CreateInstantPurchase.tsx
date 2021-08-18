import React, { FunctionComponent, useEffect, useState } from 'react';
import { getSearchParam } from "../../hooks/useSearchParam";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useInstantPurchase } from "../../talons/purchase/useInstantPurchase";
import { v4 as uuidv4 } from 'uuid';
import ConfigurableContainer from "../ConfigurableContainer";
import { LoadingSpinner } from "hds-react";
import { useTranslation } from "react-i18next";

interface OwnProps {
}

type Props = OwnProps;

const CreateInstantPurchase: FunctionComponent<Props> = (props) => {
    const { id: productId } = useParams();
    const { t } = useTranslation();
    const { fetchInstantPurchase, loading, setLoading } = useInstantPurchase();
    const [ errorMessage, setErrorMessage ] = useState("");
    const history = useHistory();
    const location = useLocation();

    const namespaceParameter = getSearchParam("namespace", location);
    const userParameter = getSearchParam("user", location);
    const quantityParameter = Number.parseInt(getSearchParam("quantity", location));
    const language = getSearchParam("language");

    // If user parameter is empty, create new uuid
    const user = userParameter === '' ? uuidv4() : userParameter;

    // If quantity is empty, fallback to 1
    const quantity = quantityParameter !== 0 ? quantityParameter : 1;
    // Fetch data from backend only if language and namespace is given.
    const canFetch = language !== "" && namespaceParameter !== "";

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {

        const payload = {
            "products": [
                {
                    "productId": `${ productId }`,
                    "unit": "pcs",
                    "quantity": quantity
                }
            ],
            "language": `${ language }`,
            "namespace": `${ namespaceParameter }`,
            "user": `${ user }`
        };

        if (canFetch) {
            fetchInstantPurchase(payload).then((data) => {
                if (loading) {
                    return
                }
                if (data.orderId !== "undefined") {
                    history.push(`/${ data.orderId }?lang=${ language }`);
                } else {
                    setErrorMessage(t('error.purchase.invalid-instant-purchase-link'));
                }
            });
        } else {
            setLoading(false);
            setErrorMessage(t('error.purchase.invalid-instant-purchase-variables'));
        }
    }, []);

    return (
        <>
            <ConfigurableContainer>
                { (() => {
                    if (loading) {
                        return <LoadingSpinner/>
                    } else if (errorMessage) {
                        return <a onClick={
                            () => {
                                window.history.back()
                            }
                        }>
                            { errorMessage }
                        </a>
                    }
                })() }
            </ConfigurableContainer>
        </>
    );
};

export default CreateInstantPurchase;
