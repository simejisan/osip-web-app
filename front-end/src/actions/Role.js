import {
    ASSIGN_ROLE,
    CREATE_ROLE,
    DELETE_ROLE,
    EDIT_SELECTED_ROLE,
    GET_ALL_ROLE,
    GET_ALL_ROLE_SUCCESS,
    HIDE_ADD_DIALOG,
    HIDE_ASSIGN_DIALOG,
    HIDE_DELETE_DIALOG,
    HIDE_EDIT_DIALOG,
    ON_HIDE_ROLE_LOADER,
    ON_SHOW_ROLE_LOADER,
    OPEN_ADD_DIALOG,
    OPEN_ASSIGN_DIALOG,
    OPEN_DELETE_DIALOG,
    OPEN_EDIT_DIALOG,
    UNASSIGN_ROLE,
    UPDATE_ROLE
} from 'constants/ActionTypes';

export const getAllRole = () => {
    return {
        type: GET_ALL_ROLE
    };
};
export const getAllRoleSuccess = (roles) => {
    return {
        type: GET_ALL_ROLE_SUCCESS,
        payload: roles
    };
};

export const assignRoleToFunc = (assignment) => {
    return {
        type: ASSIGN_ROLE,
        payload: assignment
    }
};
export const unassignRoleFromFunc = (assignment) => {
    return {
        type: UNASSIGN_ROLE,
        payload: assignment
    }
};

export const createRole = (role) => {
    return {
        type: CREATE_ROLE,
        payload: role
    };
};
export const updateRole = (role) => {
    return {
        type: UPDATE_ROLE,
        payload: role
    };
};
export const deleteRole = (roleId) => {
    return {
        type: DELETE_ROLE,
        payload: roleId
    };
};

export const openAssignRoleDialog = (role) => {
    return {
        type: OPEN_ASSIGN_DIALOG,
        payload: role
    };
};
export const hideAssignRoleDialog = () => {
    return {
        type: HIDE_ASSIGN_DIALOG,
    };
};

export const openAddRoleDialog = () => {
    return {
        type: OPEN_ADD_DIALOG,
    };
};
export const hideAddRoleDialog = () => {
    return {
        type: HIDE_ADD_DIALOG,
    };
};

export const openEditRoleDialog = (func) => {
    return {
        type: OPEN_EDIT_DIALOG,
        payload: func
    };
};
export const hideEditRoleDialog = () => {
    return {
        type: HIDE_EDIT_DIALOG,
    };
};

export const openDeleteRoleDialog = (func) => {
    return {
        type: OPEN_DELETE_DIALOG,
        payload: func
    };
};
export const hideDeleteRoleDialog = () => {
    return {
        type: HIDE_DELETE_DIALOG,
    };
};

export const editSelectedRole = (func) => {
    return {
        type: EDIT_SELECTED_ROLE,
        payload: func
    };
};

export const showRoleLoader = () => {
    return {
        type: ON_SHOW_ROLE_LOADER,
    };
};
export const hideRoleLoader = () => {
    return {
        type: ON_HIDE_ROLE_LOADER,
    };
};
