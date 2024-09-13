import {createContext, useReducer} from "react";
const DUMMY_EXPENSES = [
    {
        id: "e1",
        description: "Groceries",
        amount: 44.25,
        date: new Date("2024-04-03"),
        category: 3,
    },
    {
        id: "e2",
        description: "Groceries",
        amount: 32.56,
        date: new Date("2024-04-09"),
        category: 3,
    },
    {
        id: "e3",
        description: "Housing",
        amount: 12.99,
        date: new Date("2024-04-10"),
        category: 1,
    },
    {
        id: "e4",
        description: "Housing",
        amount: 44.25,
        date: new Date("2024-04-03"),
        category: 1,
    },
    {
        id: "e5",
        description: "Transportation",
        amount: 32.56,
        date: new Date("2024-04-09"),
        category: 2,
    },
    {
        id: "e6",
        description: "Transportation",
        amount: 12.99,
        date: new Date("2024-04-10"),
        category: 2,
    },
    {
        id: "e7",
        description: "Debt & Loans",
        amount: 44.25,
        date: new Date("2024-04-03"),
        category: 9,
    },
    {
        id: "e9",
        description: "Insurance",
        amount: 12.99,
        date: new Date("2024-04-10"),
        category: 5,
    },
    {
        id: "e11",
        description: "Insurance",
        amount: 32.56,
        date: new Date("2024-09-05"),
        category: 5,
    },

]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date, category}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date, category}) => {},
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
