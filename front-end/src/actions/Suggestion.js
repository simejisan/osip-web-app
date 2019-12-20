import {
    GET_ALL_SUGGESTION,
    GET_ALL_SUGGESTION_SUCCESS,
    ON_SHOW_SUGGESTION_LOADER,
    ON_HIDE_SUGGESTION_LOADER
} from 'constants/ActionTypes';

export const getAllSuggestion = (keyword) => {
    return {
        type: GET_ALL_SUGGESTION,
        payload: keyword
    };
};
export const getAllSuggestionSuccess = (suggestion) => {
    return {
        type: GET_ALL_SUGGESTION_SUCCESS,
        payload: suggestion
    };
};

export const showSuggestionLoader = () => {
    return {
        type: ON_SHOW_SUGGESTION_LOADER,
    };
};
export const hideSuggestionLoader = () => {
    return {
        type: ON_HIDE_SUGGESTION_LOADER,
    };
};
