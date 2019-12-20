import {
    URL_GET_ALL_USER,
    URL_USER_ASSIGNN_ROLE,
    URL_USER_SET_STATUS,
    URL_USER_DELETE_BY_EMAIL,
    URL_USER_INFO_UPDATE,
    URL_USER_PASS_CHANGE
} from '../ApiPaths'
import API from '../index'

function reqGetAllUser() {
    return API.call(URL_GET_ALL_USER, "GET");
}

function reqSetUserStatus(userId, status) {
    let url = `${URL_USER_SET_STATUS}?user_id=${userId}&status=${status}`;

    return API.call(url, "POST")
}

function reqAssignUserRole(userId, roleId) {
    let url = `${URL_USER_ASSIGNN_ROLE}?user_id=${userId}&role_id=${roleId}`;

    return API.call(url, "POST")
}

function reqDeleteUserByEmail(email) {
    let url = `${URL_USER_DELETE_BY_EMAIL}?email=${email}`;

    return API.call(url, 'DELETE');
}

function reqUpdateUserInfo(id, name, email, role_id, avatar_url, status) {
    let body = {
        name: name,
        email: email,
        role_id: role_id,
        avatar_url: avatar_url,
        status: status
    };

    let url = `${URL_USER_INFO_UPDATE}?id=${id}`;

    return API.call(url, "PUT", body)
}

function reqChangePassAccount(userId, newPassword) {
    let url = `${URL_USER_PASS_CHANGE}?user_id=${userId}&new_pass_word=${newPassword}`;

    return API.call(url, "POST")
}

export default {
    reqGetAllUser,
    reqSetUserStatus,
    reqAssignUserRole,
    reqDeleteUserByEmail,
    reqUpdateUserInfo,
    reqChangePassAccount
}
