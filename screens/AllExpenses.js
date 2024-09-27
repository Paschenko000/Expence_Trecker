import {useContext, useState, useEffect} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {ExpensesCategory} from "../components/ExpensesCategory/ExpensesCategory";
import {fetchExpenses} from "../utils/http";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";

export function AllExpenses() {
    const [errorState, setErrorState] = useState();
    const [currency, setCurrency] = useState();
    const [isFetching, setIsFetching] = useState(true);

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getData() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
                setCurrency(await getItem('CURRENCY'));
            } catch (error) {
                setErrorState(error);
            }
            setIsFetching(false);
        }

        getData().then();
    }, []);


    if (isFetching) {
        return <LoadingOverlay/>
    }

    if (errorState && !isFetching) {
        return <ErrorOverlay message={errorState}/>
    }

    return (
        <ExpensesCategory currency={currency && currency.sign} expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No registered expenses found"/>
    );
}
