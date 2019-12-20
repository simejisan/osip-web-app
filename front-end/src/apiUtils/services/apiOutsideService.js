import {
    URL_HOTWORDS,
    URL_PROMOTIONS,
    URL_SUGGESTION,
    URL_FLASHSALE,
    URL_FAVORITE,
    URL_FAVORITE_ASSIGN,
    URL_FAVORITE_UNASSIGN
} from '../ApiPaths'
import API from '../index'

function reqGetAllHotWords() {
    return API.call(URL_HOTWORDS, "GET")
}

function reqGetAllPromotions(sort_type, screen_type, offset, limit, province) {
    let url = `${URL_PROMOTIONS}?sort_type=${sort_type}&screen_type=${screen_type}&offset=${offset}&limit=${limit}&province=${province}`;

    return API.call(url, 'GET');
}

function reqGetAllSuggests(keyword) {
    let url = `${URL_SUGGESTION}?keyword=${keyword}`;

    return API.call(url, 'GET');
}

function reqGetAllFlashsale(source, offset, limit) {
    let url = `${URL_FLASHSALE}?source=${source}&offset=${offset}&limit=${limit}`;

    return API.call(url, 'GET');
}

function reqGetAllFavorites(userId) {
    let url = `${URL_FAVORITE}?user_id=${userId}`;

    return API.call(url, 'GET');
}

function reqAssignFavorite(userId, promotionId) {
    let url = `${URL_FAVORITE_ASSIGN}?user_id=${userId}&promotion_id=${promotionId}`;

    return API.call(url, 'POST');
}

function reqUnassignFavorite(userId, promotionId) {
    let url = `${URL_FAVORITE_UNASSIGN}?user_id=${userId}&promotion_id=${promotionId}`;

    return API.call(url, 'POST');
}

export default {
    reqGetAllHotWords,
    reqGetAllPromotions,
    reqGetAllSuggests,
    reqGetAllFlashsale,
    reqGetAllFavorites,
    reqAssignFavorite,
    reqUnassignFavorite
}
