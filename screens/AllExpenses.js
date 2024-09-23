import {useContext, useState, useEffect} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {ExpensesCategory} from "../components/ExpensesCategory/ExpensesCategory";
import {fetchExpenses} from "../utils/http";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";

export function AllExpenses() {
    const [errorState, setErrorState] = useState();
    const [isFetching, setIsFetching] = useState(true);

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setErrorState(error);
            }
            setIsFetching(false);
        }
        getExpenses().then();
    }, []);

    if (isFetching) {
        return <LoadingOverlay/>
    }

    if (errorState && !isFetching) {
        return <ErrorOverlay message={errorState}/>
    }

    return (
        <ExpensesCategory expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No registered expenses found"/>
    );
}
