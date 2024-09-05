import {Pressable, Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../utils/date";
import {useNavigation} from "@react-navigation/native";

export function ExpenseItem({id, description, amount, date}) {
    const navigation = useNavigation();
    function expensePressHandler() {
        navigation.navigate('ManageExpense', {expenseId: id});
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <View >
                    <Text style={[styles.textBase, {paddingBottom: 2}]}>{description}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
                <View>
                    <Text style={styles.amount}>{amount.toFixed(2)}$</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    expenseItem: {
        padding: 12,
        backgroundColor: GlobalStyles.colors.lightGray,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 5,
    },
    textBase: {
        fontSize: 16,
        color: GlobalStyles.colors.white,
        alignItems: "flex-start",
    },
    amount: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalStyles.colors.accent,
    }
})
