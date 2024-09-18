import {ScrollView, View} from "react-native";
import {useContext, useLayoutEffect} from "react";
import {GlobalStyles} from "../constants/styles";
import {StyleSheet} from "react-native";
import {Button} from "../ui/Button";
import {ExpensesContext} from "../store/expenses-context";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";
import {KeyBoardAvoidingContainer} from "../components/KeybosrdAvodingContainer/KeyBoardAvoidingContainer";

export function ManageExpense({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

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

    function submitHandler(expenseData) {
        // TODO: Fix expense adding and updating

        if (isEditing) {
            expensesCtx.updateExpense(
                editedExpenseId, expenseData
            );
        } else {
            expensesCtx.addExpense(
                expenseData
            );
        }
        navigation.goBack();
    }

    return (
        <KeyBoardAvoidingContainer>
            <View style={styles.container}>
            <ExpenseForm
                defaultValues={selectedExpense}
                isEditing={isEditing}
                onCancel={cancelHandler}
                onSubmit={submitHandler}
            />

            {isEditing &&
                <View style={styles.deleteContainer}>
                    <Button
                        mode="flat"
                        color={GlobalStyles.colors.red}
                        onPress={deleteExpenseHandler} >
                        Delete
                    </Button>
                </View>
            }
            </View>
        </KeyBoardAvoidingContainer>
    );
}

const styles = StyleSheet.create({
    deleteContainer: {
        paddingBottom: 30,
        paddingTop: 10,
        borderTopWidth: 1,
        borderColor: GlobalStyles.colors.lightGray,
    },
    container: {
        backgroundColor: GlobalStyles.colors.black,
        flex: 1,
        paddingHorizontal: 10,

    }
})
