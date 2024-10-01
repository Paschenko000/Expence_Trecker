import {Text, View, StyleSheet, Pressable} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {GlobalStyles} from "../../constants/styles";

import {ExpensesCategories} from "../../constants/expensesCategories";
import {formatDate} from "../../utils/date";
import {ExpensesCategory} from "../ExpensesCategory/ExpensesCategory";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";
import {useNavigation} from "@react-navigation/native";

export function DailyExpense({expenses, day, currency}) {
    const navigation = useNavigation();

    const expensesSum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    const date = formatDate(day);

    function expensePressHandler(expense) {
        navigation.navigate('ManageExpense', {expenseId: expense});
    }

    return (

           <View style={styles.container}>
               <View style={styles.headingContainer}>
                   <Text style={styles.date}>{date}</Text>
                   <Text style={styles.sum}>{expensesSum + currency}</Text>
               </View>

               <GrayLinearGradient styles={styles.expensesContainer}>
                   {expenses.map((expense) => (
                       <Pressable onPress={() => expensePressHandler(expense)} key={expense.id} style={({pressed}) => pressed && styles.pressed}>
                           <View style={styles.expenseButton}>
                               <View style={styles.textContainer}>
                                   <Text style={[styles.expenseCategory, {color: expense.category.color}]}>{expense.category.name}</Text>
                                   <Text style={styles.description}>{expense.description}</Text>
                               </View>
                               <Text style={[styles.expenseCategory, {color: expense.category.color}]}>{expense.amount + currency}</Text>
                           </View>
                       </Pressable>
                   ))}
               </GrayLinearGradient>

           </View>

    );
}

const styles = StyleSheet.create({
    pressed: {
        backgroundColor:GlobalStyles.colors.lightGray,
        borderRadius: 8,
    },
    container: {
        gap: 10,
        marginBottom: 20
    },
    headingContainer: {
        // paddingHorizontal: 12,
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
        padding: 5,
        gap: 10,
        borderRadius: 10,
    },
    expenseButton: {
        padding: 10,
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
