import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

export function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <ExpensesOutput expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No registered expenses found"/>
    );
}
