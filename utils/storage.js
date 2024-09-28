import {MMKV} from "react-native-mmkv";
const storage = new MMKV();

export function storeData(key, value) {
    try {
        storage.set(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export function getItem(key) {
    try {
        const value = storage.getString(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
    }
}
