import { useState } from 'react';
import {Alert, StyleSheet, View} from "react-native";
import {AuthForm} from "./AuthForm";
import {GlobalStyles} from '../../constants/styles';
import {Button} from "../../ui/Button";
import {useNavigation} from "@react-navigation/native";

export function AuthContent({ isLogin, onAuthenticate }) {
    const navigation = useNavigation();

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        email: false,
        password: false,
        confirmEmail: false,
        confirmPassword: false,
    });

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace('Signup');
        } else {
            navigation.replace('Login');
        }
    }

    function submitHandler(credentials) {
        let { email, confirmEmail, password, confirmPassword } = credentials;

        email = email.trim();
        password = password.trim();

        console.log(email, "--email", password, "--password")

        const emailIsValid = email.includes('@');
        const passwordIsValid = password.length > 6;
        const emailsAreEqual = email === confirmEmail;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                email: !emailIsValid,
                confirmEmail: !emailIsValid || !emailsAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        onAuthenticate({ email, password });
    }

    return (
        <View style={styles.authContent}>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
            />
            <View style={styles.buttons}>
                <Button onPress={switchAuthModeHandler} mode="flat" color={GlobalStyles.colors.white}>
                    {isLogin ? 'Create a new user' : 'Log in instead'}
                </Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    authContent: {
        marginTop: 64,
        marginHorizontal: 15,
    },
    buttons: {
        marginTop: 8,
    },
});
