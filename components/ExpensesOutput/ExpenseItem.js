import {Pressable, Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../utils/date";
import {useNavigation} from "@react-navigation/native";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";

export function ExpenseItem({id, description, amount, date, category}) {
    const navigation = useNavigation();
    function expensePressHandler() {
        navigation.navigate('ManageExpense', {expenseId: id});
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expenseItem}>
                <GrayLinearGradient styles={{height: 70, borderRadius: 10}}/>
                <View style={styles.textContainer}>
                    <Text style={[styles.amount, {color: ExpensesCategories[category - 1].color}]}>{ExpensesCategories[category - 1].name}</Text>
                    <Text style={[styles.textBase, {paddingBottom: 2}]}>{description}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.amount, {color: ExpensesCategories[category - 1].color}]}>{amount.toFixed(2)}$</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
        height: 70,
    },
    textContainer: {
        gap: 4,
        alignItems: "start",
    },
    amountContainer: {
        gap: 4,
        alignItems: "flex-end",
    },
    textBase: {
        fontFamily: 'Outfit-Regular',
        fontSize: 16,
        color: GlobalStyles.colors.white,
        alignItems: "flex-start",
    },
    amount: {
        fontFamily: 'Outfit-Bold',
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalStyles.colors.accent,
    }
})
