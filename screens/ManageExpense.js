import {View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import {IconButton} from "../ui/IconButton";
import {GlobalStyles} from "../constants/styles";
import {StyleSheet} from "react-native";
import {Button} from "../ui/Button";
import {ExpensesContext} from "../store/expenses-context";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";

export function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        navigation.goBack();
        expensesCtx.deleteExpense(editedExpenseId);
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        // TODO: Fix expense adding and updating
        navigation.goBack();
        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId,
                {description: "add test", amount: 567, date: new Date()}
            );
        } else {
            expensesCtx.addExpense(
                {description: "test", amount: 123, date: new Date()}
            );
        }
    }

    return (
        <View style={styles.container}>
            <ExpenseForm/>
            <View style={styles.buttonsContainer}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button  onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>

            {isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.pink}
                        size={30}
                        onPress={deleteExpenseHandler} />
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    deleteContainer: {

    },
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: GlobalStyles.colors.black,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        minWidth: 80,
        marginHorizontal: 5,
    }
})
