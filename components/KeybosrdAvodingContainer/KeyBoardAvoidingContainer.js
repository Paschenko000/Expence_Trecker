import {KeyboardAvoidingView, SafeAreaView, Platform, ScrollView, StyleSheet, StatusBar} from "react-native";
import {GlobalStyles} from "../../constants/styles";

export function KeyBoardAvoidingContainer({children}) {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: GlobalStyles.colors.black}}>
            <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView contentContainerStyle={styles.container}>
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    }
})
