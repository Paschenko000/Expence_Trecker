import {FlatList, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet} from "react-native";
import {ExpenseItem} from "./ExpenseItem";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";


const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e2",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-04-09"),
    },
    {
        id: "e3",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },
    {
        id: "e4",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e5",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-04-09"),
    },
    {
        id: "e6",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },
    {
        id: "e7",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e8",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-04-09"),
    },
    {
        id: "e9",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },{
        id: "e10",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e11",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-04-09"),
    },
    {
        id: "e12",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },
]

function renderExpense(itemData) {
    return (
        <ExpenseItem {...itemData.item} />
    );
}

export function ExpensesOutput({expenses, expensesPeriod}) {
    const bottomPadding = useBottomTabBarHeight();

    const expensesSum = DUMMY_EXPENSES.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={[styles.expensesContainer]}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
                <Text style={styles.sum}>{expensesSum.toFixed(2)}$</Text>
            </View>

            <FlatList contentContainerStyle={{paddingBottom: bottomPadding}} data={DUMMY_EXPENSES} renderItem={renderExpense} keyExtractor={(item) => item.id}/>
            
        </View>
    );
}

const styles = StyleSheet.create({
    expensesContainer: {
        backgroundColor: GlobalStyles.colors.black,
        padding: 15,
        flex: 1,
        flexDirection: "column",
        gap: 20,
    },
    summaryContainer: {
        backgroundColor: GlobalStyles.colors.lightGray,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});
