import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../utils/date";
import {useContext} from "react";

export function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateWeekAgo = getDateMinusDays(today, 7);

        return expense.date > dateWeekAgo;
    })

    return (
        <ExpensesOutput expensesPeriod="Last 7 days" expenses={recentExpenses} fallbackText="No expenses registered for the last 7 days" />
    );
}
