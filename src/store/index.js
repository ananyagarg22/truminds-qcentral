import { createStore } from 'redux';

const dataReducer = (state = { table2Data: [] }, action) => {
    if (action.type === 'UPDATE_TABLE2') {
        return {
            table2Data: action.payload,
        };
    }

    if (action.type === 'DELETE_TABLE2') {
        return {
            table2Data: [],
        };
    }

    return state;

}

export const store = createStore(dataReducer);