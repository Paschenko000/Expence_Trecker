import AsyncStorage from "@react-native-async-storage/async-storage";

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
