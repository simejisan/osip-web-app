import {store} from "react-notifications-component";
import API from "apiUtils"
import {avatars} from "components/AvatarSelectSlider"
import {FUNC_GROUP_SORT} from "constants/utils/FunctionUtils";
import moment from 'moment/moment';
import momentDurationFormatSetup from 'moment-duration-format'
import numeral from 'numeral';

momentDurationFormatSetup(moment);

var notifications = [];

function log(message = "No content", title = "NO TITLE") {
    console.info('%c## DEBUG LOGGING', 'color: red; font-weight: bold');
    console.debug(`%c${title.toUpperCase()}`, 'font-weight: bold');
    console.debug(message);
    console.debug('%c----- ##', 'color: red; font-weight: bold');
}

function createNotification(message, title, type, duration = 3000, options) {

    let opts = {
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        width: 300
    };

    if (options) opts = options;

    notifications.push(store.addNotification({
        title: title,
        message: message,
        type: type === 'error' ? 'danger' : type,
        ...opts,
        dismiss: {
            duration: duration,
            onScreen: true
        }
    }));
}

function getSavedAccountInfo() {
    return JSON.parse(localStorage.getItem("accountInfo"))
}

function clearLocalStorage() {
    localStorage.clear();
}

function setAPIToken(token) {
    API.setAuthorizationToken(token);
    setAccessTokenTimeout()
}

function getAvatarImageByUrl(url) {
    let index = avatars.findIndex(avatar => avatar.url === url);
    let result = null;

    if (index >= 0) result = avatars[index].image;

    return result
}

function formatFunctionsToTreeForm(funcs) {

    let parents = [];
    funcs.forEach(func => {
        if (func.level === 0) parents.push(func)
    });

    parents.forEach(parent => parent.children = []);

    funcs.forEach(func => {
        if (func.level === 1) {
            let index = parents.findIndex(parent => parent.id === func.parent_id);

            if (index >= 0) parents[index].children.push(func);
        }
    });

    parents = parents.sort((f1, f2) => f1.sort >= f2.sort ? 1 : -1);

    return parents;
}

function formatFunctionsToMenuForm(funcs) {

    let parents = formatFunctionsToTreeForm(funcs);
    let groups = [...FUNC_GROUP_SORT];

    parents.forEach(parent => {
        let index = groups[parent.sort].parents.findIndex(parent1 => parent1.id === parent.id);

        if (index < 0) groups[parent.sort].parents.push(parent)
    });

    return groups;
}

function setAccessTokenTimeout() {
    let timeout = moment().add(1, 'hours').unix();
    localStorage.setItem('accessTimeout', timeout.toString());
}

function setAccessSignupEmailTimeout(email) {
    let timeout = moment().add(10, 'minutes').unix();
    let signupJson = localStorage.getItem('signupTimeout');
    let signupBody = (signupJson) ? JSON.parse(signupJson) : [];

    let index = signupBody.findIndex(signup => signup.email === email);

    if (index < 0) {
        signupBody.push({
            email: email,
            timeout: timeout
        });
    } else {
        signupBody[index].timeout = timeout
    }

    localStorage.setItem('signupTimeout', JSON.stringify(signupBody));
}

function getAccessTokenAfterCheck() {
    let token = localStorage.getItem('accessToken');
    let timeout = localStorage.getItem('accessTimeout');

    if (timeout) {
        let current = moment();
        let timeoutMoment = moment.unix(timeout * 1.0);

        if (current.isSameOrAfter(timeoutMoment)) {
            clearLocalStorage();
            return null;
        }

        setAccessTokenTimeout();

        return token;
    }

    return null
}

function getDiffOfTwoMomentWithFormat(t1, t2, unit = "seconds", format = "hh:mm:ss") {
    let diff = t1.diff(t2, unit);
    return moment.duration(Math.abs(diff), unit).format(format);
}

function getShopInfoByType(type) {
    const SHOP_LIST = [
        {
            type: "sendo",
            name: "Sen Đỏ",
            link: "www.sendo.vn",
            search: "https://www.sendo.vn/tim-kiem?q=",
            image: require("assets/images/shops/sendo.png")
        },
        {
            type: "tiki",
            name: "Tiki",
            link: "www.tiki.vn",
            search: "https://tiki.vn/search?q=",
            image: require("assets/images/shops/tiki.png")
        },
        {
            type: "shopee",
            name: "Shopee",
            link: "www.shopee.vn",
            search: "https://shopee.vn/search?keyword=",
            image: require("assets/images/shops/shopee.png")
        },
        {
            type: "google",
            name: "Google",
            link: "www.google.com",
            search: "https://www.google.com/search?q=",
            image: require("assets/images/shops/google.jpg")
        },
        {
            type: "lazada",
            name: "Lazada",
            link: "www.lazada.vn",
            search: "https://www.lazada.vn/catalog/?q=",
            image: require("assets/images/shops/lazada.png")
        },
        {
            type: "yes24",
            name: "Yes24",
            link: "www.yes24.vn",
            search: "https://www.yes24.vn/tim-kiem?q=",
            image: require("assets/images/shops/yes24.png")
        },
        {
            type: "chotot",
            name: "Chợ tốt",
            link: "www.chotot.com",
            search: "https://www.chotot.com/toan-quoc/mua-ban?q=",
            image: require("assets/images/shops/chotot.jpg")
        }
    ];

    let index = SHOP_LIST.findIndex(image => image.type === type);
    if (index >= 0) return SHOP_LIST[index];

    return null
}

function formatCurrency(value) {
    return numeral(value).format('0,0') + 'đ';
}

function jsonCompare(o1, o2) {
    return JSON.stringify(o1) === JSON.stringify(o2);
}

export default {
    notifications,
    log,
    createNotification,
    getSavedAccountInfo,
    clearLocalStorage,
    setAPIToken,
    getAvatarImageByUrl,
    formatFunctionsToTreeForm,
    formatFunctionsToMenuForm,
    setAccessTokenTimeout,
    setAccessSignupEmailTimeout,
    getAccessTokenAfterCheck,
    getDiffOfTwoMomentWithFormat,
    getShopInfoByType,
    formatCurrency,
    jsonCompare
}
