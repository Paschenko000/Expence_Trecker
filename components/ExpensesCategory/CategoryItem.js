import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {useNavigation} from "@react-navigation/native";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";

export function CategoryItem({expenses, currency}) {
    const navigation = useNavigation();

    function categoryPressHandler() {
        navigation.navigate('CategoryExpenses', {expenses: expenses});
    }

    const categorySum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <GrayLinearGradient styles={styles.container}>
        <Pressable onPress={categoryPressHandler} style={({pressed}) => pressed && styles.pressed}>
            <View style={styles.expenseCategory} >
                <Text style={[styles.textBase, {paddingBottom: 4}]}>{expenses[0].category.name}</Text>
                <Text style={[styles.amount, {color: expenses[0].category.color}]}>{categorySum.toFixed(2)}{currency}</Text>
            </View>
        </Pressable>
        </GrayLinearGradient>
    );
}

const styles = StyleSheet.create({
    pressed: {
        backgroundColor:GlobalStyles.colors.lightGray,
        borderRadius: 8,
    },
    container: {
        flex: 1,
        marginBottom: 8,
        marginHorizontal: 4,
        padding: 5,
        borderRadius: 10,
    },
    expenseCategory: {
        minHeight: 100,
        padding: 10,
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
    }
})
