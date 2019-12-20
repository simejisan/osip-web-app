import {
    CHANGE_PASS_ACCOUNT,
    DELETE_ACCOUNT_BY_EMAIL,
    EDIT_SELECTED_ACCOUNT,
    GET_ALL_ACCOUNT,
    GET_ALL_ACCOUNT_SUCCESS,
    HIDE_CHANGE_PASS_DIALOG,
    HIDE_DELETE_DIALOG,
    HIDE_EDIT_DIALOG,
    ON_HIDE_ACC_LOADER,
    ON_SHOW_ACC_LOADER,
    OPEN_CHANGE_PASS_DIALOG,
    OPEN_DELETE_DIALOG,
    OPEN_EDIT_DIALOG,
    UPDATE_ACCOUNT_INFO
} from 'constants/ActionTypes';

export const getAllAccount = () => {
    return {
        type: GET_ALL_ACCOUNT
    };
};
export const getAllAccountSuccess = (accounts) => {
    return {
        type: GET_ALL_ACCOUNT_SUCCESS,
        payload: accounts
    };
};

export const updateAccount = (newInfo, isUpdatingProfile = false) => {
    return {
        type: UPDATE_ACCOUNT_INFO,
        payload: newInfo,
        isProfile: isUpdatingProfile
    }
};

export const showAccountLoader = () => {
    return {
        type: ON_SHOW_ACC_LOADER,
    };
};
export const hideAccountLoader = () => {
    return {
        type: ON_HIDE_ACC_LOADER,
    };
};

export const openDeleteAccountDialog = (account) => {
    return {
        type: OPEN_DELETE_DIALOG,
        payload: account
    };
};
export const hideDeleteAccountDialog = () => {
    return {
        type: HIDE_DELETE_DIALOG,
    };
};

export const editSelectedAccount = (account) => {
    return {
        type: EDIT_SELECTED_ACCOUNT,
        payload: account
    };
};

export const deleteAccountByEmail = (email) => {
    return {
        type: DELETE_ACCOUNT_BY_EMAIL,
        payload: email
    };
};

export const changePassAccount = (changeInfo) => {
    return {
        type: CHANGE_PASS_ACCOUNT,
        payload: changeInfo
    };
};

export const openEditAccountDialog = (account) => {
    return {
        type: OPEN_EDIT_DIALOG,
        payload: account
    };
};
export const hideEditAccountDialog = () => {
    return {
        type: HIDE_EDIT_DIALOG,
    };
};

export const openChangePassAccountDialog = (account) => {
    return {
        type: OPEN_CHANGE_PASS_DIALOG,
        payload: account
    };
};
export const hideChangePassAccountDialog = () => {
    return {
        type: HIDE_CHANGE_PASS_DIALOG,
    };
};
