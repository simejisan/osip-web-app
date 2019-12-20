import {
    EDIT_SELECTED_ROLE,
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
    OPEN_EDIT_DIALOG
} from "constants/ActionTypes";
import {ROLE_MODEL} from "../constants/utils/RoleUtils";

const INIT_STATE = {
    roleLoader: false,
    allRoles: [],
    isOpenAssign: false,
    isOpenAdd: false,
    isOpenEdit: false,
    isOpenDelete: false,
    selectedRole: {
        ...ROLE_MODEL
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ROLE_SUCCESS: {
            let newAllRoles = action.payload;
            let newSelectedRoleInfo = state.selectedRole;

            if (newSelectedRoleInfo) {
                let index = newAllRoles.findIndex(role => role.id === newSelectedRoleInfo.id);

                if (index >= 0) newSelectedRoleInfo = newAllRoles[index];
            }

            return {
                ...state,
                roleLoader: false,
                allRoles: newAllRoles,
                selectedRole: newSelectedRoleInfo
            }
        }

        case ON_SHOW_ROLE_LOADER: {
            return {
                ...state,
                roleLoader: true
            }
        }
        case ON_HIDE_ROLE_LOADER: {
            return {
                ...state,
                roleLoader: false,
                isOpenAdd: false,
                isOpenEdit: false,
                isOpenDelete: false
            }
        }

        case OPEN_ASSIGN_DIALOG: {
            return {
                ...state,
                isOpenAssign: true,
                selectedRole: action.payload,
            }
        }
        case HIDE_ASSIGN_DIALOG: {
            return {
                ...state,
                isOpenAssign: false,
                selectedRole: {
                    ...ROLE_MODEL
                },
            }
        }

        case OPEN_ADD_DIALOG: {
            return {
                ...state,
                isOpenAdd: true
            }
        }
        case HIDE_ADD_DIALOG: {
            return {
                ...state,
                isOpenAdd: false
            }
        }

        case OPEN_EDIT_DIALOG: {
            return {
                ...state,
                isOpenEdit: true,
                selectedRole: action.payload
            }
        }
        case HIDE_EDIT_DIALOG: {
            return {
                ...state,
                isOpenEdit: false
            }
        }

        case OPEN_DELETE_DIALOG: {
            return {
                ...state,
                isOpenDelete: true,
                selectedRole: action.payload
            }
        }
        case HIDE_DELETE_DIALOG: {
            return {
                ...state,
                isOpenDelete: false
            }
        }
        case EDIT_SELECTED_ROLE: {
            return {
                ...state,
                selectedRole: action.payload
            }
        }

        default:
            return state;
    }
}
