import {View} from "react-native";
import {Input} from "./Input";

export function ExpenseForm() {
    return (
        <View>
            <Input label="Amount"/>
            <Input label="Date"/>
            <Input label="Description" />
        </View>
    );
}
