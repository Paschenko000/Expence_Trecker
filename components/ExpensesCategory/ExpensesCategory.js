import {FlatList, StyleSheet, Text, View} from "react-native";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {ExpenseItem} from "../ExpensesOutput/ExpenseItem";
import {CategoryItem} from "./CategoryItem";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";

function renderExpense(itemData) {
    return (
        <CategoryItem expenses={itemData.item} />
    );
}

export function ExpensesCategory({expenses, expensesPeriod, fallbackText}) {
    const bottomPadding = useBottomTabBarHeight();

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    const categoryExpenses = [];

    for (let i = 1; i < ExpensesCategories.length; i++) {
        const filteredExpenses = expenses.filter(expense => expense.category === i);
        if (filteredExpenses.length > 0) {
            categoryExpenses.push(filteredExpenses);
        }
    }

    console.log(categoryExpenses);

    return (
        <View style={[styles.expensesContainer]}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
                <Text style={styles.sum}>{expensesSum.toFixed(2)}$</Text>
            </View>

            {expenses.length > 0 ? (
                <FlatList
                    contentContainerStyle={{paddingBottom: bottomPadding}}
                    data={categoryExpenses}
                    renderItem={renderExpense}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                />
            ) : (
                <Text style={[styles.fallbackText, {paddingBottom: bottomPadding}]}>{fallbackText}</Text>
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

