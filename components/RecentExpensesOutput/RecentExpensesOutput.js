import {View, StyleSheet, Text, FlatList} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {DailyExpense} from "./DailyExpense";

export function RecentExpensesOutput({currency, expenses, fallbackText}) {
    const bottomPadding = useBottomTabBarHeight();

    let sum = 0;
    expenses.forEach(date => {
        sum += date.expenses.reduce((sum, expense) => {
            return sum + expense.amount;
        }, 0);
    });

    function renderExpense(itemsData) {
        return (
            <DailyExpense currency={currency} {...itemsData.item}/>
        )
    }

    return(
       <View style={styles.expensesContainer}>
           <View style={GlobalStyles.shadow}>
           <GrayLinearGradient styles={[styles.summaryContainer, {borderRadius: 10}]}>
               <Text style={styles.summaryPeriod}>This Month</Text>
               <Text style={styles.sum}>{sum.toFixed(2)}{currency}</Text>
           </GrayLinearGradient>
           </View>

           {expenses.length > 0 ? (
               <FlatList
                   contentContainerStyle={{paddingBottom: bottomPadding, marginHorizontal: 4, marginTop: 20}}
                   data={expenses}
                   renderItem={renderExpense}
                   keyExtractor={item => item.day}/>
           ) : (
               <Text style={styles.fallbackText}>{fallbackText}</Text>
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
})
