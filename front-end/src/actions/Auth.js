import {
    CHECK_SIGNUP_EMAIL,
    CHECK_SIGNUP_EMAIL_SUCCESS,
    GET_ASSIGNED_FUNCTIONS,
    INIT_URL,
    ON_HIDE_AUTH_LOADER,
    ON_SHOW_AUTH_LOADER,
    RESET_SIGNUP_EMAIL,
    SEND_SIGNUP_EMAIL,
    SEND_SIGNUP_EMAIL_SUCCESS,
    SIGNIN_USER,
    SIGNIN_USER_SUCCESS,
    SIGNOUT_USER,
    SIGNOUT_USER_SUCCESS,
    SIGNUP_USER,
    SIGNUP_USER_SUCCESS
} from 'constants/ActionTypes';

export const userSignUp = (user) => {
    return {
        type: SIGNUP_USER,
        payload: user
    };
};
export const userSignIn = (user) => {
    return {
        type: SIGNIN_USER,
        payload: user
    };
};
export const userSignOut = () => {
    return {
        type: SIGNOUT_USER
    };
};
export const userSignUpSuccess = (authUser) => {
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: authUser
    };
};

export const userSignInSuccess = () => {
    return {
        type: SIGNIN_USER_SUCCESS
    }
};
export const userSignOutSuccess = () => {
    return {
        type: SIGNOUT_USER_SUCCESS,
    }
};

export const setInitUrl = (url) => {
    return {
        type: INIT_URL,
        payload: url
    };
};

export const showAuthLoader = () => {
    return {
        type: ON_SHOW_AUTH_LOADER,
    };
};
export const hideAuthLoader = () => {
    return {
        type: ON_HIDE_AUTH_LOADER,
    };
};

export const getAssignedFunctions = () => {
    return {
        type: GET_ASSIGNED_FUNCTIONS,
    };
};

export const sendSignupEmail = (email) => {
    return {
        type: SEND_SIGNUP_EMAIL,
        payload: email
    }
};
export const sendSignupEmailSuccess = () => {
    return {
        type: SEND_SIGNUP_EMAIL_SUCCESS
    }
};

export const checkSignupEmail = (code) => {
    return {
        type: CHECK_SIGNUP_EMAIL,
        payload: code
    }
};
export const checkSignupEmailSuccess = () => {
    return {
        type: CHECK_SIGNUP_EMAIL_SUCCESS
    }
};

export const resetSignupEmail = () => {
    return {
        type: RESET_SIGNUP_EMAIL
    }
};
