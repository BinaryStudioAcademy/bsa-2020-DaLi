import { combineReducers } from "redux";

const exampleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EXAMPLE':
            return {};
        default:
            return state;
    }
};

export default combineReducers({
    exampleReducer
});