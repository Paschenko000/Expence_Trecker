import {groupExpensesByDays} from "../utils/date";
import {useContext, useEffect, useState} from "react";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";
import {ExpensesContext} from "../store/expenses-context";
import {RecentExpensesOutput} from "../components/RecentExpensesOutput/RecentExpensesOutput";

export function RecentExpenses() {
    const [errorState, setErrorState] = useState();
    const [currency, setCurrency] = useState();

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        try {
            setCurrency(getItem('CURRENCY'));
        } catch (error) {
            setErrorState(error);
        }
    }, []);

    const thisMonthExpenses = groupExpensesByDays(expensesCtx.expenses);

    if (errorState) {
        return <ErrorOverlay message={errorState} />
    }

    console.log(thisMonthExpenses, "THIS MONTH EXPENSES")
    console.log(expensesCtx.expenses, "EXPENSES")

    return (
        <RecentExpensesOutput currency={currency && currency.sign} expenses={thisMonthExpenses} fallbackText="No expenses registered for the last month"/>
    );
}
