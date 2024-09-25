import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
}

export async function getItemFor(key) {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
}
