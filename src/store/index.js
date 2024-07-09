import { createStore } from 'redux';

const initialData = {
    table2Data: []
}

const dataReducer = (state = initialData, action) => {
    if (action.type === 'UPDATE_TABLE2') {
        return {
            ...state,
            table2Data: action.payload,
        };
    }

    if (action.type === 'DELETE_TABLE2') {
        return {
            ...state,
            table2Data: [],
        };
    }

    return state;

}

export const store = createStore(dataReducer);