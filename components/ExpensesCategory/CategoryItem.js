import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {useNavigation} from "@react-navigation/native";
import {GrayLinearGradient} from "../../ui/GrayLinearGradient";

export function CategoryItem({expenses, currency}) {
    const navigation = useNavigation();
    function categoryPressHandler() {
        navigation.navigate('CategoryExpenses', {categoryId: expenses[0].category, currency: currency});
    }

    const category = ExpensesCategories[expenses[0].category - 1];

    const categorySum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
        <Pressable onPress={categoryPressHandler}>
            <View style={styles.expenseCategory}>
                <GrayLinearGradient styles={{minHeight: 95, borderRadius: 10}}/>
                <Text style={[styles.textBase, {paddingBottom: 4}]}>{category.name}</Text>
                <Text style={[styles.amount, {color: category.color}]}>{categorySum.toFixed(2)}{currency}</Text>
            </View>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    container: {
        flex: 1,
        marginBottom: 8,
        marginHorizontal: 4,
    },
    expenseCategory: {
        padding: 15,
        minHeight: 95,
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
