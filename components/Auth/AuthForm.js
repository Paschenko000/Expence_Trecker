import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {Button} from "../../ui/Button";
import {Input} from "../ManageExpense/Input";
import {GlobalStyles} from "../../constants/styles";

export function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label="Email Address"
                    textInputConfig={{
                        onChangeText: updateInputValueHandler.bind(this, 'email'),
                        value: {enteredEmail},
                        keyboardType: "email-address",
                        autoCapitalize:"none"
                    }}
                    invalid={emailIsInvalid}
                    autoCorrect={false}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Email Address"
                        textInputConfig={{
                            onChangeText: updateInputValueHandler.bind(this, 'confirmEmail'),
                            value: {enteredConfirmEmail},
                            keyboardType: "email-address",
                            autoCapitalize:"none"
                        }}
                        invalid={emailsDontMatch}
                        autoCorrect={false}
                    />
                )}
                <Input
                    label="Password"
                    textInputConfig={{
                        onChangeText: updateInputValueHandler.bind(this, 'password'),
                        secureTextEntry: true,
                        value: {enteredPassword},
                    }}
                    invalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label="Confirm Password"
                        textInputConfig={{
                            onChangeText: updateInputValueHandler.bind(this, 'confirmPassword'),
                            secureTextEntry: true,
                            value: {enteredConfirmPassword},
                        }}
                        invalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler} color={GlobalStyles.colors.accent} mode="flat">
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
});
