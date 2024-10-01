import {useContext, useLayoutEffect} from "react";
import {ExpensesCategories} from "../constants/expensesCategories";
import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";

export function CategoryExpensesScreen({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext);

    const expenses = route.params?.expenses;
    const currency = route.params?.currency;
    const expensesCat = expensesCtx.expenses.filter(expense => expense.category.id === expenses[0].category.id);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: expenses[0].category.name,
        });
    }, [navigation, expenses]);

    return (
        <ExpensesOutput currency={currency} expensesPeriod="Total" expenses={expensesCat} fallbackText="No registered expenses found"/>
    );
}
