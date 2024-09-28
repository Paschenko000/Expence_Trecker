import {ExpensesOutput} from "../components/ExpensesOutput/ExpensesOutput";
import {getDateMinusDays} from "../utils/date";
import {useContext, useEffect, useState} from "react";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";

export function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true);
    const [errorState, setErrorState] = useState();
    const [currency, setCurrency] = useState();

    const expensesCtx = useContext();

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                setCurrency(await getItem('CURRENCY'));
            } catch (error) {
                setErrorState(error)
            }
            setIsFetching(false);
        }
        getExpenses().then();
    }, []);

    // TODO: change recent expenses from a week to month
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const dateWeekAgo = getDateMinusDays(today, 7);

        return expense.date > dateWeekAgo;
    });

    if (isFetching) {
        return <LoadingOverlay/>
    }

    if (errorState && !isFetching) {
        return <ErrorOverlay message={errorState} />
    }

    return (
        <ExpensesOutput currency={currency && currency.sign} expensesPeriod="Last month" expenses={recentExpenses} fallbackText="No expenses registered for the last month" />
    );
}
