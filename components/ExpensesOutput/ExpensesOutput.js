import {FlatList, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet} from "react-native";
import {ExpenseItem} from "./ExpenseItem";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";

function renderExpense(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
    );
}

export function ExpensesOutput({expenses, expensesPeriod, fallbackText}) {
    // const bottomPadding = useBottomTabBarHeight();

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={[styles.expensesContainer]}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
                <Text style={styles.sum}>{expensesSum.toFixed(2)}$</Text>
            </View>

            {expenses.length > 0 ? (
                <FlatList
                    contentContainerStyle={{ margin: 4}}
                    data={expenses}
                    renderItem={renderExpense}
                    keyExtractor={(item) => item.id}
                />
            ) : (
                <Text style={[styles.fallbackText]}>{fallbackText}</Text>
            )}


        </View>
    );
}

const styles = StyleSheet.create({
    expensesContainer: {
        backgroundColor: GlobalStyles.colors.black,
        padding: 10,
        flex: 1,
        flexDirection: "column",
    },
    summaryContainer: {
        backgroundColor: GlobalStyles.colors.gray,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 4,
    },
    summaryPeriod: {
        fontSize: 16,
        color: GlobalStyles.colors.white,
    },
    sum: {
        fontSize: 18,
        fontWeight: "bold",
        color: GlobalStyles.colors.accent,
    },
    fallbackText: {
        color: GlobalStyles.colors.accent,
        fontSize: 18,
        textAlign: "center",
        marginVertical: "auto",
    },
});
