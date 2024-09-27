import AsyncStorage from "@react-native-async-storage/async-storage";
import {all} from "axios";

export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
}

export async function getItem(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function removeItem(key, value) {
    try {
        const allData = await getItem(key);
        await storeData(key, JSON.stringify(allData.filter((item) => item !== value)))
    } catch (e) {
        console.log(e);
    }
}

export async function updateItem(key, value) {
    try {
        const allData = await getItem(key);

        const newData = allData.filter((item) => item.id !== value.id);
        const updatedData = newData.push(value);
        await storeData(key, updatedData);
    } catch (e) {
        console.log(e);
    }
}
