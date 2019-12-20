import {GET_ALL_SUGGESTION_SUCCESS, ON_SHOW_SUGGESTION_LOADER, ON_HIDE_SUGGESTION_LOADER} from "constants/ActionTypes";

const INIT_STATE = {
    suggestionLoader: false,
    allSuggestions: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SUGGESTION_SUCCESS: {
            return {
                ...state,
                suggestionLoader: false,
                allSuggestions: action.payload
            };
        }

        case ON_SHOW_SUGGESTION_LOADER: {
            return {
                ...state,
                suggestionLoader: true
            }
        }
        case ON_HIDE_SUGGESTION_LOADER: {
            return {
                ...state,
                suggestionLoader: false
            }
        }

        default:
            return state;
    }
}
