const getJsonItem = (storage: Storage, key: string): any | null => {
    const item = storage.getItem(key) || '{}';

    try {
        return JSON.parse(item);
    } catch {
        return item;
    }
};

const setJsonItem = (storage: Storage, key: string, json: object | string = {}) => {
    try {
        storage.setItem(key, JSON.stringify(json));
    } catch {
        if (typeof json === "string") {
            storage.setItem(key, json);
        } else {
            console.error("Could not setJsonItem");
        }
    }
};

const jsonStorage = (storage: Storage) => {
    return {
        get: (key: string) => getJsonItem(storage, key),
        remove: (key: string) => storage.removeItem(key),
        set: (key: string, value: object | string) => setJsonItem(storage, key, value),
    };
};

const jsonSessionStorage = jsonStorage(sessionStorage);
const jsonLocalStorage = jsonStorage(localStorage);

export {jsonLocalStorage, jsonSessionStorage, jsonStorage};
