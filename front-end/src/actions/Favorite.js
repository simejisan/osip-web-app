import {
    GET_ALL_FAVORITE,
    GET_ALL_FAVORITE_SUCCESS,
    ASSIGN_FAVORITE,
    UNASSIGN_FAVORITE,
    ON_SHOW_FAVORITE_LOADER,
    ON_HIDE_FAVORITE_LOADER
} from 'constants/ActionTypes';

export const getAllFavorite = (userId) => {
    return {
        type: GET_ALL_FAVORITE,
        payload: userId
    };
};
export const getAllFavoriteSuccess = (funcs) => {
    return {
        type: GET_ALL_FAVORITE_SUCCESS,
        payload: funcs
    };
};

export const assignFavorite = (assignment) => {
    return {
        type: ASSIGN_FAVORITE,
        payload: assignment
    }
};
export const unassignFavorite = (assignment) => {
    return {
        type: UNASSIGN_FAVORITE,
        payload: assignment
    }
};

export const showFavoriteLoader = () => {
    return {
        type: ON_SHOW_FAVORITE_LOADER,
    };
};
export const hideFavoriteLoader = () => {
    return {
        type: ON_HIDE_FAVORITE_LOADER,
    };
};
