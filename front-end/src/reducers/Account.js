import {
    EDIT_SELECTED_ACCOUNT,
    GET_ALL_ACCOUNT_SUCCESS,
    HIDE_CHANGE_PASS_DIALOG,
    HIDE_DELETE_DIALOG,
    HIDE_EDIT_DIALOG,
    ON_HIDE_ACC_LOADER,
    ON_SHOW_ACC_LOADER,
    OPEN_CHANGE_PASS_DIALOG,
    OPEN_DELETE_DIALOG,
    OPEN_EDIT_DIALOG
} from "constants/ActionTypes";
import {ACCOUNT_MODEL} from "constants/utils/AccountUtils";

const INIT_STATE = {
    accLoader: false,
    allAccounts: [],
    isOpenDelete: false,
    isOpenChangePass: false,
    isOpenEdit: false,
    selectedAccount: {
        ...ACCOUNT_MODEL
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_ACCOUNT_SUCCESS: {
            return {
                ...state,
                accLoader: false,
                allAccounts: action.payload
            }
        }

        case ON_SHOW_ACC_LOADER: {
            return {
                ...state,
                accLoader: true
            }
        }
        case ON_HIDE_ACC_LOADER: {
            return {
                ...state,
                accLoader: false,
                isOpenEdit: false,
                isOpenChangePass: false,
                isOpenDelete: false
            }
        }

        case OPEN_EDIT_DIALOG: {
            return {
                ...state,
                isOpenEdit: true,
                selectedAccount: action.payload
            }
        }
        case HIDE_EDIT_DIALOG: {
            return {
                ...state,
                isOpenEdit: false,
            }
        }

        case OPEN_DELETE_DIALOG: {
            return {
                ...state,
                isOpenDelete: true,
                selectedAccount: action.payload
            }
        }
        case HIDE_DELETE_DIALOG: {
            return {
                ...state,
                isOpenDelete: false
            }
        }

        case OPEN_CHANGE_PASS_DIALOG: {
            return {
                ...state,
                isOpenChangePass: true,
                selectedAccount: action.payload
            }
        }
        case HIDE_CHANGE_PASS_DIALOG: {
            return {
                ...state,
                isOpenChangePass: false
            }
        }

        case EDIT_SELECTED_ACCOUNT: {
            return {
                ...state,
                selectedAccount: action.payload
            }
        }

        default:
            return state;
    }
}
