import axios from "axios";

function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `OSIP ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

function config() {
    setAuthorizationToken(localStorage.getItem('accessToken'));
    axios.defaults.baseURL = "https://osip-server.herokuapp.com";
    axios.defaults.responseType = 'json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common.post = {};
    axios.defaults.headers.common.post['Content-Type'] = 'application/json';
    axios.defaults.headers.common.put = {};
    axios.defaults.headers.common.put['Content-Type'] = 'application/json';
    axios.defaults.xsrfCookieName = '_CSRF';
    axios.defaults.xsrfHeaderName = 'CSRF';
}

function GET(url) {
    return axios.get(url)
}

function POST(url, body) {
    if (body) {
        return axios.post(url, JSON.stringify(body), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else {
        return axios.post(url)
    }
}

function PUT(url, body) {
    return axios.put(url, JSON.stringify(body), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function DELETE(url) {
    return axios.delete(url)
}


async function call(url, method, body) {

    // __.log(`Calling API from URL ${url} with method ${method}`, "Call API");

    method = method.toUpperCase();

    let response = null;

    switch (method) {
        case 'GET':
            response = await GET(url);
            break;
        case 'POST':
            response = await POST(url, body);
            break;
        case 'PUT':
            response = await PUT(url, body);
            break;
        case 'DELETE':
            response = await DELETE(url);
            break;
        default:
            return;
    }

    let result;

    if (response.status !== 200) {
        result = {
            message: response.statusText,
            code: response.status,
            data: null
        }
    } else {
        let apiData = response.data;

        if (apiData.message) {
            result = {
                message: apiData.message,
                code: apiData.code,
                data: null
            }
        } else {
            result = {
                message: "Success!",
                code: 200,
                data: {...apiData}
            }
        }
    }

    return result
}

export default {
    setAuthorizationToken,
    config,
    call,
}
