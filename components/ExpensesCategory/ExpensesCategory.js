import {FlatList, StyleSheet, Text, View} from "react-native";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {CategoryItem} from "./CategoryItem";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";


export function ExpensesCategory({currency, expenses, expensesPeriod, fallbackText}) {
    const bottomPadding = useBottomTabBarHeight();

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    const categoryExpenses = [];

    for (const {id} of ExpensesCategories) {
        const filteredExpenses = expenses.filter(expense => expense.category === id);
        if (filteredExpenses.length > 0) {
            categoryExpenses.push(filteredExpenses);
        }
    }

    function renderExpense(itemData) {
        return (
            <CategoryItem currency={currency} expenses={itemData.item} />
        );
    }

    return (
        <View style={[styles.expensesContainer]}>
            <View style={styles.summaryContainer}>
                <GrayLinearGradient styles={{borderRadius: 10, height: 70}}/>
                <Text style={styles.summaryPeriod}>{expensesPeriod}</Text>
                <Text style={styles.sum}>{expensesSum.toFixed(2)}{currency}</Text>
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
        gap: 8,
        padding: 10,
        flex: 1,
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
        fontSize: 18,
        fontFamily: 'Outfit-ExtraBold',
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

