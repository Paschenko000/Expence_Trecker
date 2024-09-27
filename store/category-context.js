import {createContext, useReducer} from "react";
import {ExpensesCategories} from "../constants/expensesCategories";

export const CategoryContext = createContext({
    categories: [],
    addCategory: ({id, name, color}) => {},
})

function categoryReducer() {
    switch (action.type) {
        case "ADD":
            return [{...action.payload}, ...state];
    }
}

export function CategoryContextProvider({children}) {
    const [categorySate, dispatch] = useReducer(categoryReducer, ExpensesCategories);

    function addCategory(categoryData) {
        dispatch({type: "ADD", payload: categoryData});
    }

    const value = {
        categories: categorySate,
        addCategory: addCategory,
    };

    return <CategoryContext.Provider value={value}></CategoryContext.Provider>
}
