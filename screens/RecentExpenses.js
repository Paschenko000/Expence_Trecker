import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {getDateMinusDays} from "../utils/date";
import {useContext, useEffect, useState} from "react";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";
import {ExpensesContext} from "../store/expenses-context";

export function RecentExpenses() {
    const [errorState, setErrorState] = useState();
    const [currency, setCurrency] = useState();

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        try {
            setCurrency(getItem('CURRENCY'));
        } catch (error) {
            setErrorState(error)
        }
    }, []);

    // TODO: change recent expenses from a week to month

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const currentDay = today.getDate();
        const dateWeekAgo = getDateMinusDays(today, currentDay - 1);

        return new Date(expense.date) > dateWeekAgo;
    });





    if (errorState) {
        return <ErrorOverlay message={errorState} />
    }

    return (
        <ExpensesOutput currency={currency && currency.sign} expensesPeriod="Last month" expenses={recentExpenses} fallbackText="No expenses registered for the last month" />
    );
}
