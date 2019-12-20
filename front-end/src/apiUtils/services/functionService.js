import {URL_FUNCTION, URL_FUNCTION_CREATE, URL_FUNCTION_DELETE, URL_FUNCTION_UPDATE} from '../ApiPaths'
import API from '../index'

function reqGetFunction(id) {
    let url = URL_FUNCTION;

    if (id && id !== "") url += `/${id}`;

    return API.call(url, "GET")
}

function reqCreateFunction(short, name, description, level, parentId, status, onMenu, sort, icon, link) {
    let body = {
        short: short,
        name: name,
        description: description,
        level: level,
        parent_id: parentId,
        status: status,
        on_menu: onMenu,
        sort: sort,
        icon: icon,
        link: link
    };

    return API.call(URL_FUNCTION_CREATE, "POST", body)
}

function reqUpdateFunction(id, short, name, description, level, parentId, status, onMenu, sort, icon, link) {
    let body = {
        short: short,
        name: name,
        description: description,
        level: level,
        parent_id: parentId,
        status: status,
        on_menu: onMenu,
        sort: sort,
        icon: icon,
        link: link
    };

    let url = `${URL_FUNCTION_UPDATE}/${id}`;

    return API.call(url, "PUT", body)
}

function reqDeleteFunction(id) {
    let url = `${URL_FUNCTION_DELETE}/${id}`;

    return API.call(url, "DELETE")
}

export default {
    reqGetFunction,
    reqCreateFunction,
    reqUpdateFunction,
    reqDeleteFunction
}
