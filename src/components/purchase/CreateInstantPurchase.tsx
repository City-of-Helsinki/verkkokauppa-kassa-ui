import React, { FunctionComponent, useEffect, useState } from 'react';
import { getSearchParam } from "../../hooks/general/useSearchParam";
import { useLocation, useParams } from "react-router-dom";
import { useInstantPurchase } from "../../hooks/purchase/useInstantPurchase";
import ConfigurableContainer from "../layout/containers/ConfigurableContainer";
import { LoadingSpinner } from "hds-react-next";
import { useTranslation } from "react-i18next";
import { useArrayGetParams } from "../../hooks/general/useArrayGetParams";
import { MetaParameter } from "../../types/meta/types";
import useUser from "../../hooks/header/useUser";
import { STORAGE_LANG_KEY } from "../../TranslationConstants";
import { useSessionStorage } from "../../hooks/general/useStorage";

interface OwnProps {
}

type Props = OwnProps;

const CreateInstantPurchase: FunctionComponent<Props> = (props) => {
    const { id: productId } = useParams();
    const { i18n, t } = useTranslation();
    const { user, setOrGenerateUserId } = useUser();

    const { fetchInstantPurchase, loading, setLoading } = useInstantPurchase();
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ userUpdated, setUserUpdated ] = useState(false);

    const location = useLocation();

    const namespaceParameter = getSearchParam("namespace", location);
    const userParameter = getSearchParam("user", location);
    const quantityParameter = Number.parseInt(getSearchParam("quantity", location));
    const language = getSearchParam("language", location);
    let metaArray = useArrayGetParams('meta', location);
    // If user parameter is empty, create new uuid

    // If quantity is empty, fallback to 1
    const quantity = quantityParameter !== 0 ? quantityParameter : 1;
    // Fetch data from backend only if language and namespace is given.
    const canFetch = language !== "" && namespaceParameter !== "";

    const [, update] = useSessionStorage(STORAGE_LANG_KEY);

    useEffect(() => {
        setOrGenerateUserId(userParameter)
        setUserUpdated(true)

        if (language) {
            // Set the correct language
            i18n.changeLanguage(language);
            update(i18n.language);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        if (!userUpdated || !user) {
            return
        }
        let payload = {
            "products": [
                {
                    "productId": `${ productId }`,
                    "unit": "pcs",
                    "quantity": quantity
                }
            ],
            "language": `${ language }`,
            "namespace": `${ namespaceParameter }`,
            "user": `${ user }`,
        };

        if (metaArray.length) {
            const filteredMeta = metaArray.filter((parameter : MetaParameter) => {
                const keys = Object.keys(parameter);
                // Meta parameters must to have key and value with values
                return keys.includes('value') && keys.includes('key') && parameter.value !== '' && parameter.key !== '';
            });
            if (filteredMeta.length) {
                payload = { ...payload, ...{ meta: filteredMeta } };
            }
        }

        if (canFetch) {
            fetchInstantPurchase(payload).then((data) => {
                if (loading) {
                    return
                }
                if (data.orderId !== "undefined") {
                    window.location.replace(`/${ data.orderId }?lang=${ language }`);
                } else {
                    setErrorMessage(t('error.purchase.invalid-instant-purchase-link'));
                }
            });
        } else {
            setLoading(false);
            setErrorMessage(t('error.purchase.invalid-instant-purchase-variables'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userUpdated, user]);

    return (
        <>
            <ConfigurableContainer>
                { (() => {
                    if (loading) {
                        return <ConfigurableContainer containerClassName={'box py-5 full-width'}>
                                    <LoadingSpinner />
                                </ConfigurableContainer>;
                    } else if (errorMessage) {
                        return <button  onClick={ () => window.history.back() }>
                            { errorMessage }
                        </button>
                    }
                })() }
            </ConfigurableContainer>
        </>
    );
};

export default CreateInstantPurchase;
