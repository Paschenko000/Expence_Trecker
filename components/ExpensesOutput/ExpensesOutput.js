import {FlatList, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {StyleSheet} from "react-native";
import {ExpenseItem} from "./ExpenseItem";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";


export function ExpensesOutput({currency, expenses, expensesPeriod, fallbackText}) {
    // const bottomPadding = useBottomTabBarHeight();

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    function renderExpense(itemData) {
        return (
            <ExpenseItem currency={currency} {...itemData.item} />
        );
    }

    return (
        <View style={[styles.expensesContainer]}>
            <View style={styles.summaryContainer}>
                <GrayLinearGradient styles={{height: 70, borderRadius: 10}}/>
                <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
                <Text style={styles.sum}>{expensesSum.toFixed(2)}{currency}</Text>
            </View>

            {expenses.length > 0 ? (
                <FlatList
                    contentContainerStyle={{marginHorizontal: 4}}
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
        gap: 8,
        flexDirection: "column",
    },
    summaryContainer: {
        height: 70,
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 4,
        marginTop: 4,
    },
    summaryPeriod: {
        fontFamily: 'Outfit-Medium',
        fontSize: 18,
        color: GlobalStyles.colors.white,
    },
    sum: {
        fontFamily: 'Outfit-ExtraBold',
        fontSize: 18,
        color: GlobalStyles.colors.accent,
    },
    fallbackText: {
        fontFamily: 'Outfit-Regular',
        color: GlobalStyles.colors.accent,
        fontSize: 18,
        textAlign: "center",
        marginVertical: "auto",
    },
});
