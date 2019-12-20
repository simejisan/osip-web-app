import {
    URL_ROLE_ADD,
    URL_ROLE_ALL,
    URL_ROLE_ASSIGN,
    URL_ROLE_DELETE,
    URL_ROLE_EDIT,
    URL_ROLE_UNASSIGN
} from '../ApiPaths'
import API from '../index'

function reqGetAllRole() {
    return API.call(URL_ROLE_ALL, "GET")
}

function reqAssignRoleToFunc(roleId, funcId) {
    let url = `${URL_ROLE_ASSIGN}?role_id=${roleId}&func_id=${funcId}`;

    return API.call(url, "POST")
}

function reqUnassignRoleToFunc(roleId, funcId) {
    let url = `${URL_ROLE_UNASSIGN}?role_id=${roleId}&func_id=${funcId}`;

    return API.call(url, "POST")
}

function reqCreateRole(name, label, description, isChangealbe) {
    let body = {
        name: name,
        label: label,
        description: description,
        is_changeable: isChangealbe
    };

    return API.call(URL_ROLE_ADD, "POST", body)
}

function reqUpdateRole(id, name, label, description, isChangealbe) {
    let body = {
        name: name,
        label: label,
        description: description,
        is_changeable: isChangealbe
    };

    let url = `${URL_ROLE_EDIT}?id=${id}`;

    return API.call(url, "PUT", body)
}

function reqDeleteRole(id) {
    let url = `${URL_ROLE_DELETE}?id=${id}`;

    return API.call(url, "DELETE")
}

export default {
    reqGetAllRole,
    reqAssignRoleToFunc,
    reqUnassignRoleToFunc,
    reqCreateRole,
    reqUpdateRole,
    reqDeleteRole
}
