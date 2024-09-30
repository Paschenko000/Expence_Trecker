import {Text, View, StyleSheet, Pressable} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {GlobalStyles} from "../../constants/styles";

import {ExpensesCategories} from "../../constants/expensesCategories";
import {formatDate} from "../../utils/date";
import {ExpensesCategory} from "../ExpensesCategory/ExpensesCategory";

export function DailyExpense({expenses, day, currency}) {
    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    const date = formatDate(day);

    return (

           <View style={styles.container}>
               <View style={styles.headingContainer}>
                   <Text style={styles.date}>{date}</Text>
                   <Text style={styles.sum}>{expensesSum + currency}</Text>
               </View>

               <LinearGradient colors={[GlobalStyles.colors.lightGray, GlobalStyles.colors.gray]} style={{ borderRadius: 10,}}>
               <View style={styles.expensesContainer}>
                   {expenses.map((expense) => (
                       <Pressable onPress={() => {}} key={expense.id} >
                           <View style={styles.expenseButton}>
                               <View style={styles.textContainer}>
                                   <Text style={[styles.expenseCategory, {color: ExpensesCategories[expense.category - 1].color}]}>{ExpensesCategories[expense.category - 1].name}</Text>
                                   <Text style={styles.description}>{expense.description}</Text>
                               </View>
                               <Text style={[styles.expenseCategory, {color: ExpensesCategories[expense.category - 1].color}]}>{expense.amount + currency}</Text>
                           </View>
                       </Pressable>
                   ))}
               </View>
               </LinearGradient>
           </View>

    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    container: {
        gap: 10,
        marginBottom: 20
    },
    headingContainer: {
        paddingHorizontal: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
        alignItems: "flex-start",

    },
    date: {
        fontFamily: "Outfit-Medium",
        color: GlobalStyles.colors.white,
        fontSize: 18,
    },
    sum: {
        color: GlobalStyles.colors.accent,
        fontFamily: "Outfit-Bold",
        fontSize: 18,
    },
    expensesContainer : {
        padding: 12,
        gap: 15,
    },
    expenseButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 20,
    },
    expenseCategory: {
        fontSize: 16,
        fontFamily: 'Outfit-Bold'
    },
    description: {
        fontFamily: 'Outfit-Regular',
        fontSize: 16,
        color: GlobalStyles.colors.white,
        alignItems: "flex-start",
    },
    textContainer: {
        gap: 5,
        alignItems: "flex-start"
    }

})
