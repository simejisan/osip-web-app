import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {ASSIGN_FAVORITE, GET_ALL_FAVORITE, UNASSIGN_FAVORITE} from "constants/ActionTypes";
import {
    getAllFavorite,
    getAllFavoriteSuccess
} from "actions/Favorite";

import ApiOutsideService from 'apiUtils/services/apiOutsideService'
import __ from "helpers/globalHelpers";

const getAllFavoriteRequest = async (userId) =>
    await ApiOutsideService.reqGetAllFavorites(userId);

const assignFavoriteRequest = async (body) => {
    const {userId, promotionId} = body;
    return await ApiOutsideService.reqAssignFavorite(userId, promotionId);
};

const unassignFavoriteRequest = async (body) => {
    const {userId, promotionId} = body;
    return await ApiOutsideService.reqUnassignFavorite(userId, promotionId);
};

function* getAllFavoriteHandler({payload}) {
    const failTitle = "Lấy danh sách mã giảm giá ưu thích của người dùng thất bại";
    try {
        const favoriteList = yield call(getAllFavoriteRequest, payload);

        if (favoriteList.message && favoriteList.code !== 200) {
            __.createNotification(`${favoriteList.code}: ${favoriteList.message}`, failTitle, "error");
        } else {
            yield put(getAllFavoriteSuccess(favoriteList.data.promotions));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
    }
}

function* assignFavoriteHandler({payload}) {
    const failTitle = "Lưu khuyến mại ưu thích thất bại";
    try {
        const roleAssign = yield call(assignFavoriteRequest, payload);

        if (roleAssign.message && roleAssign.code !== 200) {
            __.createNotification(`${roleAssign.code}: ${roleAssign.message}`, failTitle, "error");
        } else {
            __.createNotification(roleAssign.message, "Lưu khuyến mại ưu thích thành công", "success");
            yield put(getAllFavorite(__.getSavedAccountInfo().user.id));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
    }
}

function* unassignFavoriteHandler({payload}) {
    const failTitle = "Huỷ khuyến mại ưu thích thất bại";
    try {
        const roleUnassign = yield call(unassignFavoriteRequest, payload);

        if (roleUnassign.message && roleUnassign.code !== 200) {
            __.createNotification(`${roleUnassign.code}: ${roleUnassign.message}`, failTitle, "error");
        } else {
            __.createNotification(roleUnassign.message, "Huỷ khuyến mại ưu thích thành công", "success");
            yield put(getAllFavorite(__.getSavedAccountInfo().user.id));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
    }
}

export function* getAllFavorites() {
    yield takeEvery(GET_ALL_FAVORITE, getAllFavoriteHandler);
}

export function* assignFavorite() {
    yield takeEvery(ASSIGN_FAVORITE, assignFavoriteHandler);
}

export function* unassignFavorite() {
    yield takeEvery(UNASSIGN_FAVORITE, unassignFavoriteHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllFavorites),
        fork(assignFavorite),
        fork(unassignFavorite)
    ]);
}
