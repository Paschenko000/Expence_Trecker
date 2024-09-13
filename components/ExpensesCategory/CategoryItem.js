import {Pressable, StyleSheet, Text, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {ExpensesCategories} from "../../constants/expensesCategories";
import {useNavigation} from "@react-navigation/native";

export function CategoryItem({expenses}) {
    const navigation = useNavigation();
    function categoryPressHandler() {
        navigation.navigate('CategoryExpenses', {categoryId: expenses[0].category});
    }

    const category = ExpensesCategories[expenses[0].category - 1];

    const categorySum = expenses.reduce((sum, expense) => {
        return sum + expense.amount;
    }, 0);

    return (
        <View style={styles.container}>
        <Pressable onPress={categoryPressHandler}>
            <View style={styles.expenseCategory}>
                <View style={styles.items}>
                    <Text style={[styles.textBase, {paddingBottom: 4}]}>{category.name}</Text>
                    <Text style={[styles.amount, {color: category.color}]}>{categorySum.toFixed(2)}$</Text>
                </View>
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
        margin: 4,
    },
    items: {
        minHeight: 65,
    },
    expenseCategory: {
        padding: 15,
        backgroundColor: GlobalStyles.colors.gray,
        borderRadius: 10,

    },
    textBase: {
        fontSize: 16,
        color: GlobalStyles.colors.white,
        alignItems: "flex-start",
    },
    amount: {
        fontSize: 18,
        fontWeight: "bold",
    }
})
