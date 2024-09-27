import {useContext, useLayoutEffect} from "react";
import {ExpensesCategories} from "../constants/expensesCategories";
import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";

export function CategoryExpensesScreen({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext);

    const categoryId = route.params?.categoryId;
    const currency = route.params?.currency;
    const expenses = expensesCtx.expenses.filter(expense => expense.category === categoryId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: ExpensesCategories[categoryId - 1].name
        });
    }, [navigation, categoryId]);

    return (
        <ExpensesOutput currency={currency} expensesPeriod="Total" expenses={expenses} fallbackText="No registered expenses found"/>
    );
}