import {
    GET_ALL_PROMOTION,
    GET_ALL_PROMOTION_SUCCESS,
    ON_SHOW_PROMOTION_LOADER,
    ON_HIDE_PROMOTION_LOADER,
    CLEAR_PROMOTIONS,
    CHANGE_PROMOTION_FILTER_INFO,
    HIDE_PROMOTION_FRAME_DIALOG,
    OPEN_PROMOTION_FRAME_DIALOG
} from 'constants/ActionTypes';

export const getAllPromotion = (filters) => {
    return {
        type: GET_ALL_PROMOTION,
        payload: filters
    };
};
export const getAllPromotionSuccess = (promotions) => {
    return {
        type: GET_ALL_PROMOTION_SUCCESS,
        payload: promotions
    };
};

export const showPromotionLoader = () => {
    return {
        type: ON_SHOW_PROMOTION_LOADER,
    };
};
export const hidePromotionLoader = () => {
    return {
        type: ON_HIDE_PROMOTION_LOADER,
    };
};

export const clearPromotions = () => {
    return {
        type: CLEAR_PROMOTIONS,
    }
};

export const changeFilterInfo = (filterInfo) => {
    return {
        type: CHANGE_PROMOTION_FILTER_INFO,
        payload: filterInfo
    }
};

export const openFrameDialog = (url) => {
    return {
        type: OPEN_PROMOTION_FRAME_DIALOG,
        payload: url
    };
};
export const hideFrameDialog = (url) => {
    return {
        type: HIDE_PROMOTION_FRAME_DIALOG,
        payload: url
    };
};
