import {GET_ALL_HOTWORDS_SUCCESS, ON_SHOW_HOTWORDS_LOADER, ON_HIDE_HOTWORDS_LOADER} from "constants/ActionTypes";

const INIT_STATE = {
    hotwordsLoader: false,
    allHotwords: []
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_HOTWORDS_SUCCESS: {
            return {
                ...state,
                hotwordsLoader: false,
                allHotwords: action.payload
            };
        }

        case ON_SHOW_HOTWORDS_LOADER: {
            return {
                ...state,
                hotwordsLoader: true
            }
        }
        case ON_HIDE_HOTWORDS_LOADER: {
            return {
                ...state,
                hotwordsLoader: false
            }
        }

        default:
            return state;
    }
}
