import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {SIGNIN_USER, SIGNOUT_USER, SIGNUP_USER} from "constants/ActionTypes";
import {
    getAssignedFunctions,
    hideAuthLoader,
    userSignIn,
    userSignInSuccess,
    userSignOutSuccess,
    sendSignupEmailSuccess,
    checkSignupEmailSuccess
} from "actions/Auth";

import AuthService from 'apiUtils/services/authService'
import __ from "helpers/globalHelpers";
import {GET_ASSIGNED_FUNCTIONS, SEND_SIGNUP_EMAIL, CHECK_SIGNUP_EMAIL} from "../constants/ActionTypes";

const createUserWithInfoRequest = async (payload) => {
    const {name, email, password, rePassword, avatarUrl} = payload;
    return await AuthService.reqUserRegister(name, email, password, rePassword, avatarUrl);
};

const signInUserWithEmailPasswordRequest = async (payload) => {
    const {email, password} = payload;
    return await AuthService.reqUserLogin(email, password);
};

const getAssignedFunctionsRequest = async () =>
    await AuthService.reqGetAssignedFunctions();

const sendSignupEmail = async (email) =>
    await AuthService.reqSendSignUpEmail(email);

const checkSignupEmail = async (code) =>
    await AuthService.reqCheckSignUpEmail(code);

function* createUserWithInfo({payload}) {
    const {email, password} = payload;
    const failTitle = "Đăng ký thất bại";
    try {
        const signUpUser = yield call(createUserWithInfoRequest, payload);
        if (signUpUser.message && signUpUser.code !== 200) {
            __.createNotification(`${signUpUser.code}: ${signUpUser.message}`, failTitle, "error");
            yield put(hideAuthLoader())
        } else {
            __.createNotification(signUpUser.message, "Đăng ký thành công", "success");
            setTimeout(yield put(userSignIn({email, password})), 1000);
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAuthLoader())
    }
}

function* signInUserWithEmailPassword({payload}) {
    const failTitle = "Đăng nhập thất bại";
    try {
        const signInUser = yield call(signInUserWithEmailPasswordRequest, payload);
        if (signInUser.message && signInUser.code !== 200) {
            __.createNotification(`${signInUser.code}: ${signInUser.message}`, failTitle, "error");
            yield put(hideAuthLoader())
        } else {
            localStorage.setItem('accessToken', signInUser.data.access_token);
            __.setAPIToken(signInUser.data.access_token);
            yield put(getAssignedFunctions());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAuthLoader())
    }
}

function* signOut() {
    __.createNotification("Rất vui được đồng hành cùng bạn!", "Cảm ơn và hẹn gặp lại", "info");
    __.clearLocalStorage();
    yield put(userSignOutSuccess());
}

function* getAssignedFunctionsHandler() {
    const failTitle = "Lấy danh sách các chức năng được cấp phép thất bại";
    try {
        const assignedFuncs = yield call(getAssignedFunctionsRequest);
        if (assignedFuncs.message && assignedFuncs.code !== 200) {
            __.createNotification(`${assignedFuncs.code}: ${assignedFuncs.message}`, failTitle, "error");
            yield put(hideAuthLoader())
        } else {
            localStorage.removeItem('accountInfo');
            localStorage.setItem('accountInfo', JSON.stringify(assignedFuncs.data));
            yield put(userSignInSuccess());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAuthLoader())
    }
}

function* sendSignupEmailHandler({payload}) {
    const failTitle = "Gửi email xác nhận thất bại";
    try {
        const emailSended = yield call(sendSignupEmail, payload);
        if (emailSended.message && emailSended.code !== 200) {
            __.createNotification(`${emailSended.code}: ${emailSended.message}`, failTitle, "error");
            yield put(hideAuthLoader())
        } else {
            __.createNotification(emailSended.message + ", vui lòng kiểm tra mail của bạn để nhận mã xác thực tiếp tục đăng ký!", "Gửi email xác nhận thành công", "success");
            __.setAccessSignupEmailTimeout(payload);
            yield put(sendSignupEmailSuccess());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAuthLoader())
    }
}

function* checkSignupEmailHandler({payload}) {
    const failTitle = "Kiểm tra mã xác nhận thất bại";
    try {
        const emailSended = yield call(checkSignupEmail, payload);
        if (emailSended.message && emailSended.code !== 200) {
            __.createNotification(`${emailSended.code}: ${emailSended.message}`, failTitle, "error");
            yield put(hideAuthLoader())
        } else {
            __.createNotification(emailSended.message + ", vui lòng tiếp tục nhập thông tin cần đăng ký!", "Kiểm tra mã xác nhận thành công", "success");
            yield put(checkSignupEmailSuccess());
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideAuthLoader())
    }
}

export function* createUserAccount() {
    yield takeEvery(SIGNUP_USER, createUserWithInfo);
}

export function* signInUser() {
    yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}

export function* signOutUser() {
    yield takeEvery(SIGNOUT_USER, signOut);
}

export function* getAssignedFunction() {
    yield takeEvery(GET_ASSIGNED_FUNCTIONS, getAssignedFunctionsHandler);
}

export function* sendSignupemail() {
    yield takeEvery(SEND_SIGNUP_EMAIL, sendSignupEmailHandler);
}

export function* checkSignupemail() {
    yield takeEvery(CHECK_SIGNUP_EMAIL, checkSignupEmailHandler);
}

export default function* rootSaga() {
    yield all([fork(signInUser),
        fork(createUserAccount),
        fork(signOutUser),
        fork(getAssignedFunction),
        fork(sendSignupemail),
        fork(checkSignupemail)]);
}
