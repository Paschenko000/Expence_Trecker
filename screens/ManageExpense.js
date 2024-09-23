import {ScrollView, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import {GlobalStyles} from "../constants/styles";
import {StyleSheet} from "react-native";
import {Button} from "../ui/Button";
import {ExpensesContext} from "../store/expenses-context";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";
import {KeyBoardAvoidingContainer} from "../components/KeybosrdAvodingContainer/KeyBoardAvoidingContainer";
import {deleteExpense, storeExpense, updateExpense} from "../utils/http";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";

export function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorState, setErrorState] = useState();

    const expensesCtx = useContext(ExpensesContext)

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);

        try {
            await deleteExpense(editedExpenseId);
            navigation.goBack();
            expensesCtx.deleteExpense(editedExpenseId);
        } catch (error) {
            setErrorState(error);
            setIsSubmitting(false)
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function submitHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                expensesCtx.updateExpense(
                    editedExpenseId, expenseData
                );
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id});
            }
            navigation.goBack();
        } catch (error) {
            setErrorState(error);
            setIsSubmitting(false);
        }


    }


    if (isSubmitting) {
        return <LoadingOverlay/>;
    }

    if (errorState && !isSubmitting) {
        return <ErrorOverlay message={errorState} />
    }

    return (
        // <KeyBoardAvoidingContainer>
        <ScrollView style={{backgroundColor: GlobalStyles.colors.black}}>
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
        </ScrollView>
        // </KeyBoardAvoidingContainer>
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
