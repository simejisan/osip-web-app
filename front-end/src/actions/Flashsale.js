import {
    GET_ALL_FLASHSALE,
    GET_ALL_FLASHSALE_SUCCESS,
    ON_SHOW_FLASHSALE_LOADER,
    ON_HIDE_FLASHSALE_LOADER,
    CLEAR_FLASHSALES,
    CHANGE_FLASHSALE_FILTER_INFO
} from 'constants/ActionTypes';

export const getAllFlashsale = (filters) => {
    return {
        type: GET_ALL_FLASHSALE,
        payload: filters
    };
};
export const getAllFlashsaleSuccess = (flashsales) => {
    return {
        type: GET_ALL_FLASHSALE_SUCCESS,
        payload: flashsales
    };
};

export const showFlashsaleLoader = () => {
    return {
        type: ON_SHOW_FLASHSALE_LOADER,
    };
};
export const hideFlashsaleLoader = () => {
    return {
        type: ON_HIDE_FLASHSALE_LOADER,
    };
};

export const clearFlashsales = () => {
    return {
        type: CLEAR_FLASHSALES,
    }
};

export const changeFilterInfo = (filterInfo) => {
    return {
        type: CHANGE_FLASHSALE_FILTER_INFO,
        payload: filterInfo
    }
};
