import {
    EDIT_SELECTED_FUNCTION,
    GET_ALL_FUNCTION_SUCCESS,
    GET_FUNCTION_SUCCESS,
    HIDE_ADD_DIALOG,
    HIDE_DELETE_DIALOG,
    HIDE_EDIT_DIALOG,
    ON_HIDE_FUNC_LOADER,
    ON_SHOW_FUNC_LOADER,
    OPEN_ADD_DIALOG,
    OPEN_DELETE_DIALOG,
    OPEN_EDIT_DIALOG
} from "constants/ActionTypes";
import {FUNC_MODEL} from "constants/utils/FunctionUtils";

const INIT_STATE = {
    funcLoader: false,
    allFunctions: [],
    isOpenAdd: false,
    isOpenEdit: false,
    isOpenDelete: false,
    selectedFunc: {
        ...FUNC_MODEL
    }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_FUNCTION_SUCCESS: {
            return {
                ...state,
                funcLoader: false,
                allFunctions: action.payload
            }
        }
        case GET_FUNCTION_SUCCESS: {
            return {
                ...state,
                funcLoader: false
            }
        }

        case ON_SHOW_FUNC_LOADER: {
            return {
                ...state,
                funcLoader: true
            }
        }
        case ON_HIDE_FUNC_LOADER: {
            return {
                ...state,
                funcLoader: false,
                isOpenAdd: false,
                isOpenEdit: false,
                isOpenDelete: false
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
                selectedFunc: action.payload
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
                selectedFunc: action.payload
            }
        }
        case HIDE_DELETE_DIALOG: {
            return {
                ...state,
                isOpenDelete: false
            }
        }
        case EDIT_SELECTED_FUNCTION: {
            return {
                ...state,
                selectedFunc: action.payload
            }
        }

        default:
            return state;
    }
}
