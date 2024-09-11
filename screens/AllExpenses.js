import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {ExpensesCategory} from "../components/ExpensesCategory/ExpensesCategory";

export function AllExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <ExpensesCategory expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No registered expenses found"/>
    );
}
