import {
    GET_ALL_PROMOTION_SUCCESS,
    ON_SHOW_PROMOTION_LOADER,
    ON_HIDE_PROMOTION_LOADER,
    CLEAR_PROMOTIONS,
    CHANGE_PROMOTION_FILTER_INFO,
    OPEN_PROMOTION_FRAME_DIALOG,
    HIDE_PROMOTION_FRAME_DIALOG
} from "constants/ActionTypes";
import {PROMOTION_FILTER_INFO} from "constants/utils/PromotionUtils";

const INIT_STATE = {
    promotionLoader: false,
    allPromotions: [],
    isOpenLink: false,
    filterInfo: {
        ...PROMOTION_FILTER_INFO
    },
    currentURL: '',
    isOpenFrame: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PROMOTION_SUCCESS: {
            return {
                ...state,
                promotionLoader: false,
                allPromotions: state.allPromotions.concat(action.payload)
            };
        }

        case CLEAR_PROMOTIONS: {
            return {
                ...state,
                promotionLoader: false,
                allPromotions: []
            };
        }

        case ON_SHOW_PROMOTION_LOADER: {
            return {
                ...state,
                promotionLoader: true
            }
        }
        case ON_HIDE_PROMOTION_LOADER: {
            return {
                ...state,
                promotionLoader: false,
            }
        }

        case CHANGE_PROMOTION_FILTER_INFO: {
            return {
                ...state,
                filterInfo: action.payload
            }
        }

        case OPEN_PROMOTION_FRAME_DIALOG: {
            return {
                ...state,
                currentURL: action.payload,
                isOpenFrame: true
            }
        }
        case HIDE_PROMOTION_FRAME_DIALOG: {
            return {
                ...state,
                currentURL: '',
                isOpenFrame: false
            }
        }

        default:
            return state;
    }
}
