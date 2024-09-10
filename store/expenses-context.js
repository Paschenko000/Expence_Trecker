import {createContext, useReducer} from "react";
const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e2",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-04-09"),
    },
    {
        id: "e3",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },
    {
        id: "e4",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e5",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-04-09"),
    },
    {
        id: "e6",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },
    {
        id: "e7",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-04-03"),
    },
    {
        id: "e9",
        description: "Some description",
        amount: 12.99,
        date: new Date("2024-04-10"),
    },{
        id: "e10",
        description: "Some description",
        amount: 44.25,
        date: new Date("2024-09-03"),
    },
    {
        id: "e11",
        description: "Some description",
        amount: 32.56,
        date: new Date("2024-09-05"),
    },

]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case "ADD":
            const id = Math.random();
            return [{...action.payload, id}, ...state];
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
    const [expensesState, dispatch ] = useReducer(expensesReducer, DUMMY_EXPENSES );

    function addExpense(expenseData) {
        dispatch({type: "ADD", payload: expenseData});
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
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}
