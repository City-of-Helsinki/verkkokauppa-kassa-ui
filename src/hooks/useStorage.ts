import {useCallback, useState} from 'react';

import {jsonStorage} from '../utils/storage';
import useEventListener from "./useEventListener";

const useStorage = (storageType: Storage, key: string) => {
    const {get, remove, set} = jsonStorage(storageType);
    const [value, setValue] = useState(get(key));

    const listener = useCallback(
        ({detail}) => {
            if (detail.key === key) {
                setValue(detail.newValue);
            }
        },
        [key]
    );

    useEventListener(window, 'storage_change', listener, false);

    const updater = (newValue: object | string, removeItem: boolean) => {
        if (removeItem) {
            remove(key);
        } else {
            set(key, newValue);
        }

        window.dispatchEvent(
            new CustomEvent('storage_change', {detail: {key, newValue}})
        );
    };

    return [
        value,
        (newValue: object | string) => updater(newValue, false),
        () => updater({}, true)
    ];
};

const setStorage = (storage: Storage) => (key: string) => useStorage(storage, key);

const useLocalStorage = setStorage(localStorage);
const useSessionStorage = setStorage(sessionStorage);

export {useLocalStorage, useSessionStorage};