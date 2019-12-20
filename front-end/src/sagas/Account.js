import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    CHANGE_PASS_ACCOUNT,
    DELETE_ACCOUNT_BY_EMAIL,
    GET_ALL_ACCOUNT,
    UPDATE_ACCOUNT_INFO
} from "constants/ActionTypes";
import {
    getAllAccount,
    getAllAccountSuccess,
    hideAccountLoader,
    hideChangePassAccountDialog,
    hideDeleteAccountDialog,
    hideEditAccountDialog
} from "actions/Account";

import {getAssignedFunctions} from "actions/Auth";

import AccountService from 'apiUtils/services/accountService'
import __ from "helpers/globalHelpers";

const getAllAccountRequest = async () =>
    await AccountService.reqGetAllUser();

const updateAccountRequest = async (body) => {
    const {id, name, email, role_id, avatar_url, status} = body;
    return await AccountService.reqUpdateUserInfo(id, name, email, role_id, avatar_url, status);
};

const changePassAccountRequest = async (changeInfo) => {
    const {userId, newPass} = changeInfo;

    return await AccountService.reqChangePassAccount(userId, newPass);
};

const deleteAccountByEmail = async (email) =>
    await AccountService.reqDeleteUserByEmail(email);

function* getAllAccountHandler() {
    const failTitle = "Lấy danh sách tài khoản người dùng thất bại";
    try {
        const accountList = yield call(getAllAccountRequest);

        if (accountList.message && accountList.code !== 200) {
            __.createNotification(`${accountList.code}: ${accountList.message}`, failTitle, "error");
            yield put(hideAccountLoader())
        } else {
            yield put(getAllAccountSuccess(accountList.data.users));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAccountLoader())
    }
}

function* updateAccountHandler({payload, isProfile}) {
    const failTitle = "Cập nhật tài khoản người dùng thất bại";
    try {
        const accUpdated = yield call(updateAccountRequest, payload);

        if (accUpdated.message && accUpdated.code !== 200) {
            __.createNotification(`${accUpdated.code}: ${accUpdated.message}`, failTitle, "error");
            yield put(hideAccountLoader())
        } else {
            __.createNotification(accUpdated.message, "Cập nhật tài khoản người dùng thành công", "success");

            if (isProfile) {
                yield put(getAssignedFunctions());
                yield put(hideAccountLoader());
            } else yield put(getAllAccount());

            yield put(hideEditAccountDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAccountLoader())
    }
}

function* changePassAccountHandler({payload}) {
    const failTitle = "Đổi mật khẩu tài khoản người dùng thất bại";
    try {
        const passChanged = yield call(changePassAccountRequest, payload);

        if (passChanged.message && passChanged.code !== 200) {
            __.createNotification(`${passChanged.code}: ${passChanged.message}`, failTitle, "error");
            yield put(hideAccountLoader())
        } else {
            __.createNotification(passChanged.message, "Đổi mật khẩu tài khoản người dùng thành công", "success");
            yield put(getAllAccount());
            yield put(hideChangePassAccountDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAccountLoader())
    }
}

function* deleteAccountHandler({payload}) {
    const failTitle = "Xoá tài khoản người dùng thất bại";
    try {
        const accountRole = yield call(deleteAccountByEmail, payload);

        if (accountRole.message && accountRole.code !== 200) {
            __.createNotification(`${accountRole.code}: ${accountRole.message}`, failTitle, "error");
            yield put(hideAccountLoader())
        } else {
            __.createNotification(accountRole.message, "Xoá tài khoản người dùng thành công", "success");
            yield put(getAllAccount());
            yield put(hideDeleteAccountDialog());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAccountLoader())
    }
}

export function* getAllAccounts() {
    yield takeEvery(GET_ALL_ACCOUNT, getAllAccountHandler);
}

export function* updateAccount() {
    yield takeEvery(UPDATE_ACCOUNT_INFO, updateAccountHandler);
}

export function* changePassAccount() {
    yield takeEvery(CHANGE_PASS_ACCOUNT, changePassAccountHandler);
}

export function* deleteAccount() {
    yield takeEvery(DELETE_ACCOUNT_BY_EMAIL, deleteAccountHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllAccounts),
        fork(updateAccount),
        fork(changePassAccount),
        fork(deleteAccount)
    ]);
}
