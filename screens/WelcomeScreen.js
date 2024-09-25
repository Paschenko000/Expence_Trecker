import {SafeAreaView, Text, StyleSheet, View, Linking, Pressable, TouchableOpacity} from "react-native";
import {GlobalStyles} from "../constants/styles";

export function WelcomeScreen() {
    function handlePress() {
        Linking.openURL('https://github.com/Paschenko000');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.heading}>Welcome to Expense Tracker!</Text>
                <Text style={styles.paragraph}>
                Manage your personal expenses effortlessly with this simple and intuitive app.
                Track your spending in selected currency, set categories.
                </Text>

                <View style={styles}>

                </View>


                <Text style={styles.about}>
                    This app is a portfolio project built to showcase my skills in mobile app development using React Native and Firebase.
                </Text>


                <TouchableOpacity onPress={handlePress}>
                    <Text style={styles.link}>GitHub: https://github.com/Paschenko000</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.black
    },
    textContainer: {
        marginTop: 32,
        marginHorizontal: 15,
        gap: 20,
    },
    heading: {
        fontSize: 24,
        color: GlobalStyles.colors.accent,
        textAlign: "center",
        fontWeight: "bold",
    },
    paragraph: {
        fontSize: 20,
        color: GlobalStyles.colors.white,
        textAlign: "center",
    },
    about: {
        fontSize: 16,
        color: GlobalStyles.colors.white,
    },
    link: {
        fontSize: 16,
        color: GlobalStyles.colors.accent,
    },
    currencyContainer: {

    }
})
