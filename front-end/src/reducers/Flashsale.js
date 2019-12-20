import {
    GET_ALL_FLASHSALE_SUCCESS,
    ON_SHOW_FLASHSALE_LOADER,
    ON_HIDE_FLASHSALE_LOADER,
    CLEAR_FLASHSALES,
    CHANGE_FLASHSALE_FILTER_INFO
} from "constants/ActionTypes";
import {FLASHSALE_FILTER_INFO} from "constants/utils/FlashsaleUtils";

const INIT_STATE = {
    flashsaleLoader: false,
    allFlashsales: [],
    isOpenLink: false,
    filterInfo: {
        ...FLASHSALE_FILTER_INFO
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_FLASHSALE_SUCCESS: {
            return {
                ...state,
                flashsaleLoader: false,
                allFlashsales: state.allFlashsales.concat(action.payload)
            };
        }

        case CLEAR_FLASHSALES: {
            return {
                ...state,
                flashsaleLoader: false,
                allFlashsales: []
            };
        }

        case ON_SHOW_FLASHSALE_LOADER: {
            return {
                ...state,
                flashsaleLoader: true
            }
        }
        case ON_HIDE_FLASHSALE_LOADER: {
            return {
                ...state,
                flashsaleLoader: false,
            }
        }

        case CHANGE_FLASHSALE_FILTER_INFO: {
            return {
                ...state,
                filterInfo: action.payload
            }
        }

        default:
            return state;
    }
}
