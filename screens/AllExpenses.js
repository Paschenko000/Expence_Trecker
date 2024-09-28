import {useContext, useState, useEffect} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {ExpensesCategory} from "../components/ExpensesCategory/ExpensesCategory";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";
import {getItem} from "../utils/storage";
import {Text} from "react-native";

export function AllExpenses() {
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

    useEffect(() => {
        console.log(expensesCtx, 'EXPENSES 111')
    }, [expensesCtx])


    // if (isFetching) {
    //     return <LoadingOverlay/>
    // }
    // console.log(expensesCtx.expenses, "expenses");

    return (
        <ExpensesCategory currency={currency && currency.sign} expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No registered expenses found"/>
    );
}
