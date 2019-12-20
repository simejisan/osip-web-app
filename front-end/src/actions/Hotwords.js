import {
    GET_ALL_HOTWORDS,
    GET_ALL_HOTWORDS_SUCCESS,
    ON_SHOW_HOTWORDS_LOADER,
    ON_HIDE_HOTWORDS_LOADER
} from 'constants/ActionTypes';

export const getAllHotwords = () => {
    return {
        type: GET_ALL_HOTWORDS
    };
};
export const getAllHotwordsSuccess = (hotwords) => {
    return {
        type: GET_ALL_HOTWORDS_SUCCESS,
        payload: hotwords
    };
};

export const showHotwordsLoader = () => {
    return {
        type: ON_SHOW_HOTWORDS_LOADER,
    };
};
export const hideHotwordsLoader = () => {
    return {
        type: ON_HIDE_HOTWORDS_LOADER,
    };
};
