import {View, StyleSheet, Text} from "react-native";
import {GlobalStyles} from "../constants/styles";


export function AddCategoryScreen() {
    return(
        <View style={[styles.container]}>
            <Text style={styles.title}>Add Category</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: GlobalStyles.colors.black,
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    title: {
        fontFamily: 'Outfit-Bold',
        fontSize: 22,
        color:  GlobalStyles.colors.white,
        marginBottom: 20,
    },
})
