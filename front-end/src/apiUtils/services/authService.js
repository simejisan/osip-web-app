import {
    URL_ASSIGNED_FUNCTION,
    URL_USER_LOGIN,
    URL_USER_REGISTER,
    URL_EMAIL_SEND,
    URL_EMAIL_CHECK
} from '../ApiPaths'
import API from '../index'

function reqUserRegister(name, email, password, rePassword, avatarUrl) {
    const body = {
        name: name,
        email: email,
        password: password,
        repassword: rePassword,
        avatar_url: avatarUrl
    };

    return API.call(URL_USER_REGISTER, "POST", body)
}

function reqUserLogin(email, password) {
    const body = {
        email: email,
        password: password
    };

    return API.call(URL_USER_LOGIN, "POST", body)
}

function reqGetAssignedFunctions() {
    return API.call(URL_ASSIGNED_FUNCTION, "GET")
}

function reqSendSignUpEmail(email) {
    const body = {
        email: email
    };

    return API.call(URL_EMAIL_SEND, "POST", body)
}

function reqCheckSignUpEmail(code) {
    let url = `${URL_EMAIL_CHECK}?verification_code=${code}`;

    return API.call(url, "GET");
}

export default {
    reqUserRegister,
    reqUserLogin,
    reqGetAssignedFunctions,
    reqSendSignUpEmail,
    reqCheckSignUpEmail
}
