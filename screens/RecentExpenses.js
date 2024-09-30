import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {getDateMinusDays, groupExpensesByDays} from "../utils/date";
import {useContext, useEffect, useState} from "react";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";
import {ExpensesContext} from "../store/expenses-context";
import {RecentExpensesOutput} from "../components/RecentExpensesOutput/RecentExpensesOutput";
import {View} from "react-native";

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

    const thisMonthExpenses = groupExpensesByDays(expensesCtx.expenses)

    console.log(thisMonthExpenses)

    if (errorState) {
        return <ErrorOverlay message={errorState} />
    }


    return (
        <RecentExpensesOutput currency={currency && currency.sign} expenses={thisMonthExpenses} fallbackText="No expenses registered for the last month"/>
    //     <ExpensesOutput currency={currency && currency.sign} expensesPeriod="Last month" expenses={recentExpenses} fallbackText="No expenses registered for the last month" />
    );
}
