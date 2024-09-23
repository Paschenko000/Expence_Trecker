import {ActivityIndicator, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../constants/styles";
export function LoadingOverlay() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="small" color="white"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: GlobalStyles.colors.black,
    }
})
