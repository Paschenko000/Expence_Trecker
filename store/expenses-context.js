import {createContext, useReducer} from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date, category}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date, category}) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            return [{...action.payload}, ...state];
        case "SET":
            const inverted = action.payload.reverse()
            return inverted
        case "UPDATE":
            const itemIToUpdate = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const itemToUpdate = state[itemIToUpdate];
            const updatedItem = {...itemToUpdate, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[itemIToUpdate] = updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

export function ExpensesContextProvider({children}) {
    const [expensesState, dispatch ] = useReducer(expensesReducer, []);

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
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
