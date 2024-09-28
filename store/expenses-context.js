import {createContext, useEffect, useReducer} from "react";
import {getItem, storeData} from "../utils/storage";
import {LoadingOverlay} from "../ui/LoadingOverlay";
import {ErrorOverlay} from "../ui/ErrorOverlay";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date, category}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date, category}) => {},
    getExpenses: (state) => state
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = Math.random();
            const expensesAdd = [{...action.payload, id}, ...state]
            storeData("EXPENSES", expensesAdd);
            return expensesAdd;
        case "SET":

            return action.payload;
        case "UPDATE":
            const itemIToUpdate = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const itemToUpdate = state[itemIToUpdate];
            const updatedItem = {...itemToUpdate, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[itemIToUpdate] = updatedItem;
            await storeData("EXPENSES", updatedExpenses);
            return updatedExpenses;
        case "DELETE":
            const expenses = state.filter((expense) => expense.id !== action.payload);
            await storeData("EXPENSES", expenses)
            return expenses;
        default:
            return state;
    }
}

export function ExpensesContextProvider({children}) {

    const [expensesState, dispatch ] = useReducer(expensesReducer, null);

    useEffect(() => {
        async function getData(){
            const data = await getItem("EXPENSES");
            if (data) {
                dispatch({type: "SET", payload: data});
            } else {
                dispatch({type: "SET", payload: []});
            }
        }
        getData()

    }, []);

    function addExpense(expenseData) {
        dispatch({type: "ADD", payload: expenseData});
    }

    function setExpenses(expenses) {
        dispatch({type: "SET", payload: expenses});
    }

    function deleteExpense(id) {
        dispatch({type: "DELETE", payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: "UPDATE", payload: {id, data: expenseData}});
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };



    if (expensesState === null) {
        return <LoadingOverlay/>
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
