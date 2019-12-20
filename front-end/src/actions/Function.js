import {
    CREATE_FUNCTION,
    DELETE_FUNCTION,
    EDIT_SELECTED_FUNCTION,
    GET_ALL_FUNCTION,
    GET_ALL_FUNCTION_SUCCESS,
    GET_FUNCTION,
    GET_FUNCTION_SUCCESS,
    HIDE_ADD_DIALOG,
    HIDE_DELETE_DIALOG,
    HIDE_EDIT_DIALOG,
    ON_HIDE_FUNC_LOADER,
    ON_SHOW_FUNC_LOADER,
    OPEN_ADD_DIALOG,
    OPEN_DELETE_DIALOG,
    OPEN_EDIT_DIALOG,
    UPDATE_FUNCTION
} from 'constants/ActionTypes';

export const getAllFunction = () => {
    return {
        type: GET_ALL_FUNCTION
    };
};
export const getAllFunctionSuccess = (funcs) => {
    return {
        type: GET_ALL_FUNCTION_SUCCESS,
        payload: funcs
    };
};
export const getFunction = (funcId) => {
    return {
        type: GET_FUNCTION,
        payload: funcId
    };
};
export const getFunctionSuccess = (func) => {
    return {
        type: GET_FUNCTION_SUCCESS,
        payload: func
    };
};
export const createFunction = (func) => {
    return {
        type: CREATE_FUNCTION,
        payload: func
    };
};
export const updateFunction = (func) => {
    return {
        type: UPDATE_FUNCTION,
        payload: func
    };
};
export const deleteFunction = (funcId) => {
    return {
        type: DELETE_FUNCTION,
        payload: funcId
    };
};

export const showFuncLoader = () => {
    return {
        type: ON_SHOW_FUNC_LOADER,
    };
};
export const hideFuncLoader = () => {
    return {
        type: ON_HIDE_FUNC_LOADER,
    };
};

export const openAddFuncDialog = () => {
    return {
        type: OPEN_ADD_DIALOG,
    };
};
export const hideAddFuncDialog = () => {
    return {
        type: HIDE_ADD_DIALOG,
    };
};

export const openEditFuncDialog = (func) => {
    return {
        type: OPEN_EDIT_DIALOG,
        payload: func
    };
};
export const hideEditFuncDialog = () => {
    return {
        type: HIDE_EDIT_DIALOG,
    };
};

export const openDeleteFuncDialog = (func) => {
    return {
        type: OPEN_DELETE_DIALOG,
        payload: func
    };
};
export const hideDeleteFuncDialog = () => {
    return {
        type: HIDE_DELETE_DIALOG,
    };
};

export const editSelectedFunction = (func) => {
    return {
        type: EDIT_SELECTED_FUNCTION,
        payload: func
    };
};
