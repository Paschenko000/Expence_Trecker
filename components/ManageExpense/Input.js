import {Text, TextInput, View} from "react-native";

export function Input({label, textInputConfig}) {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput {...textInputConfig} />
        </View>
    );
}
