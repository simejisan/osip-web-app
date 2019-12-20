import {
    CHECK_SIGNUP_EMAIL_SUCCESS,
    INIT_URL,
    ON_HIDE_AUTH_LOADER,
    ON_SHOW_AUTH_LOADER,
    SEND_SIGNUP_EMAIL_SUCCESS,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER_SUCCESS,
    RESET_SIGNUP_EMAIL
} from "constants/ActionTypes";
import __ from "helpers/globalHelpers";

const INIT_STATE = {
    authLoader: false,
    showMessage: false,
    initURL: '',
    authUser: __.getAccessTokenAfterCheck(),
    userInfo: __.getSavedAccountInfo(),
    isSignupSended: false,
    isSignupChecked: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SIGNUP_USER_SUCCESS: {
            return {
                ...state,
                authLoader: false
            }
        }
        case SIGNIN_USER_SUCCESS: {
            return {
                ...state,
                authLoader: false,
                initURL: '/app/trending',
                authUser: localStorage.getItem('accessToken'),
                userInfo: __.getSavedAccountInfo()
            }
        }
        case INIT_URL: {
            return {
                ...state,
                initURL: action.payload
            }
        }
        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                authUser: null,
                authLoader: false
            }
        }

        case ON_SHOW_AUTH_LOADER: {
            return {
                ...state,
                authLoader: true
            }
        }
        case ON_HIDE_AUTH_LOADER: {
            return {
                ...state,
                authLoader: false
            }
        }

        case SEND_SIGNUP_EMAIL_SUCCESS: {
            return {
                ...state,
                isSignupSended: true,
                authLoader: false,
            }
        }
        case CHECK_SIGNUP_EMAIL_SUCCESS: {
            return {
                ...state,
                isSignupChecked: true,
                authLoader: false,
            }
        }

        case RESET_SIGNUP_EMAIL: {
            return {
                ...state,
                isSignupSended: false,
                isSignupChecked: false,
                authLoader: false,
            }
        }

        default:
            return state;
    }
}
