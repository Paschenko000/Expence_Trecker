import {ScrollView, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import {GlobalStyles} from "../constants/styles";
import {StyleSheet} from "react-native";
import {Button} from "../ui/Button";
import {ExpensesContext} from "../store/expenses-context";
import {ExpenseForm} from "../components/ManageExpense/ExpenseForm";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";

export function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorState, setErrorState] = useState();
    const [currency, setCurrency] = useState();

    const expensesCtx = useContext(ExpensesContext);

    const expense = route.params?.expense;
    const isEditing = !!expense;

    // const selectedExpense = expensesCtx.expenses.find(expense => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense"
        });
            setCurrency(getItem("CURRENCY"));
    }, [navigation, isEditing]);



    async function deleteExpenseHandler() {
        setIsSubmitting(true);

        try {
            navigation.goBack();
            expensesCtx.deleteExpense(expense.id);
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
                    expense.id, expenseData
                );
            } else {

                expensesCtx.addExpense({...expenseData});
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
        <ScrollView style={{backgroundColor: GlobalStyles.colors.black}}>
            <View style={styles.container}>
            <ExpenseForm
                currency={currency && currency.code}
                defaultValues={expense}
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
