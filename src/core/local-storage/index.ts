// import AsyncStorage from "@react-native-async-storage/async-storage";
import EncryptedStorage from 'react-native-encrypted-storage';
import { ASYNC_STORAGE_KEY } from '../constants';

const getStorageData = async () => {
    let $data = {};

    try {
        // const data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        const data = await EncryptedStorage.getItem(ASYNC_STORAGE_KEY);

        return data ? JSON.parse(data) : $data;
    } catch {
        // ignore
    }

    return $data;
};

const LocalStorage  = {
    getItem: async (key: string) => {
        const storedData = await getStorageData();

        return key && storedData[key];
    },
    setItem: async (key: string, value: any) => {
        const storedData = await getStorageData();

        storedData[key] = value;

        // await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(storedData));
        await EncryptedStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(storedData));
    },
    updateItem: async (key: string, value: any) => {
        const storedData = await getStorageData();

        storedData[key] = {
            ...(storedData[key] || {}),
            ...value
        };

        // await AsyncStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(storedData));
        await EncryptedStorage.setItem(ASYNC_STORAGE_KEY, JSON.stringify(storedData));
    },
    clear: () => {
        // AsyncStorage.removeItem(ASYNC_STORAGE_KEY);
        // AsyncStorage.clear();
        EncryptedStorage.removeItem(ASYNC_STORAGE_KEY);
        EncryptedStorage.clear();
    }
};

export default LocalStorage;
