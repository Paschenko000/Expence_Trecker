import {Text, TextInput, View} from "react-native";
import {StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

export function Input({label, textInputConfig, style, invalid}) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }

    if (invalid) {
        inputStyles.push(styles.invalidInput)
    }

    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        marginHorizontal: 4
    },
    label: {
        fontSize: 16,
        color: GlobalStyles.colors.white,
        marginBottom: 7,
        marginLeft: 15,
    },
    input: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: GlobalStyles.colors.gray,
        fontSize: 18,
        color: GlobalStyles.colors.white
    },
    inputMultiline :{
        textAlignVertical: "top",
        minHeight: 75,
    },
    invalidLabel: {
        color: GlobalStyles.colors.red,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error,
    },
})
