import {
    GET_ALL_FAVORITE_SUCCESS,
    ON_SHOW_FAVORITE_LOADER,
    ON_HIDE_FAVORITE_LOADER
} from "constants/ActionTypes";

const INIT_STATE = {
    favoriteLoader: false,
    allFavorites: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_FAVORITE_SUCCESS: {
            return {
                ...state,
                favoriteLoader: false,
                allFavorites: action.payload
            }
        }

        case ON_SHOW_FAVORITE_LOADER: {
            return {
                ...state,
                favoriteLoader: true
            }
        }
        case ON_HIDE_FAVORITE_LOADER: {
            return {
                ...state,
                favoriteLoader: false
            }
        }

        default:
            return state;
    }
}
