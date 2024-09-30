import {Pressable, Text, View, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../utils/date";
import {useNavigation} from "@react-navigation/native";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";

export function ExpenseItem({currency, id, description, amount, date, category}) {
    const navigation = useNavigation();
    function expensePressHandler() {
        navigation.navigate('ManageExpense', {expenseId: id});
    }

    return (
        <Pressable onPress={expensePressHandler} style={({pressed}) => pressed && styles.pressed}>
            <GrayLinearGradient styles={styles.expenseItem}>
                <View style={styles.textContainer}>
                    <Text style={[styles.amount, {color: ExpensesCategories[category - 1].color}]}>{ExpensesCategories[category - 1].name}</Text>
                    <Text style={[styles.textBase, {paddingBottom: 2}]}>{description}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.amount, {color: ExpensesCategories[category - 1].color}]}>{amount.toFixed(2)}{currency}</Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                </View>
            </GrayLinearGradient>
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
        borderRadius: 10,
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
        color: GlobalStyles.colors.accent,
    }
})
