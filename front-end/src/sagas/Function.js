import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    CREATE_FUNCTION,
    DELETE_FUNCTION,
    GET_ALL_FUNCTION,
    GET_FUNCTION,
    UPDATE_FUNCTION,
} from "constants/ActionTypes";
import {
    getAllFunction,
    getAllFunctionSuccess,
    getFunctionSuccess,
    hideAddFuncDialog,
    hideDeleteFuncDialog,
    hideEditFuncDialog,
    hideFuncLoader,
} from "actions/Function";

import FuncService from 'apiUtils/services/functionService'
import __ from "helpers/globalHelpers";

const getAllFunctionRequest = async () =>
    await FuncService.reqGetFunction("");

const getFunctionRequest = async (funcId) =>
    await FuncService.reqGetFunction(funcId);

const createFunctionRequest = async (body) => {
    const {short, name, description, level, parent_id, status, on_menu, sort, icon, link} = body;
    return await FuncService.reqCreateFunction(short, name, description, level, parent_id, status, on_menu, sort, icon, link);
};

const updateFunctionRequest = async (body) => {
    const {id, short, name, description, level, parent_id, status, on_menu, sort, icon, link} = body;
    return await FuncService.reqUpdateFunction(id, short, name, description, level, parent_id, status, on_menu, sort, icon, link);
};

const deleteFunctionRequest = async (body) => {
    const {id} = body;
    return await FuncService.reqDeleteFunction(id);
};

function* getAllFunctionHandler() {
    const failTitle = "Lấy danh sách chức năng thất bại";
    try {
        const funcList = yield call(getAllFunctionRequest);

        if (funcList.message && funcList.code !== 200) {
            __.createNotification(`${funcList.code}: ${funcList.message}`, failTitle, "error");
            yield put(hideFuncLoader())
        } else {
            yield put(getAllFunctionSuccess(funcList.data.functions));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideFuncLoader())
    }
}

function* getFunctionHandler(payload) {
    const failTitle = "Lấy thông tin chức năng thất bại";
    try {
        const funcDetail = yield call(getFunctionRequest, payload);

        if (funcDetail.message && funcDetail.code !== 200) {
            __.createNotification(`${funcDetail.code}: ${funcDetail.message}`, failTitle, "error");
            yield put(hideFuncLoader())
        } else {
            yield put(getFunctionSuccess(funcDetail.data));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideFuncLoader())
    }
}

function* createFunctionHandler({payload}) {
    const failTitle = "Tạo mới chức năng thất bại";
    try {
        const funcNew = yield call(createFunctionRequest, payload);

        if (funcNew.message && funcNew.code !== 200) {
            __.createNotification(`${funcNew.code}: ${funcNew.message}`, failTitle, "error");
            yield put(hideFuncLoader())
        } else {
            __.createNotification(funcNew.message, "Tạo mới chức năng thành công", "success");
            yield put(getAllFunction());
            yield put(hideAddFuncDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideFuncLoader())
    }
}

function* updateFunctionHandler({payload}) {
    const failTitle = "Cập nhật chức năng thất bại";
    try {
        const funcUpdated = yield call(updateFunctionRequest, payload);

        if (funcUpdated.message && funcUpdated.code !== 200) {
            __.createNotification(`${funcUpdated.code}: ${funcUpdated.message}`, failTitle, "error");
            yield put(hideFuncLoader())
        } else {
            __.createNotification(funcUpdated.message, "Cập nhật chức năng thành công", "success");
            yield put(getAllFunction());
            yield put(hideEditFuncDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideFuncLoader())
    }
}

function* deleteFunctionHandler({payload}) {
    const failTitle = "Xoá chức năng thất bại";
    try {
        const funcDeleted = yield call(deleteFunctionRequest, payload);

        if (funcDeleted.message && funcDeleted.code !== 200) {
            __.createNotification(`${funcDeleted.code}: ${funcDeleted.message}`, failTitle, "error");
            yield put(hideFuncLoader())
        } else {
            __.createNotification(funcDeleted.message, "Xoá chức năng thành công", "success");
            yield put(getAllFunction());
            yield put(hideDeleteFuncDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideFuncLoader())
    }
}

export function* getAllFunctions() {
    yield takeEvery(GET_ALL_FUNCTION, getAllFunctionHandler);
}

export function* getFunction() {
    yield takeEvery(GET_FUNCTION, getFunctionHandler);
}

export function* createFunction() {
    yield takeEvery(CREATE_FUNCTION, createFunctionHandler);
}

export function* updateFunction() {
    yield takeEvery(UPDATE_FUNCTION, updateFunctionHandler);
}

export function* deleteFunction() {
    yield takeEvery(DELETE_FUNCTION, deleteFunctionHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllFunctions),
        fork(getFunction),
        fork(createFunction),
        fork(updateFunction),
        fork(deleteFunction)
    ]);
}
