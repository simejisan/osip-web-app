import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    GET_ALL_HOTWORDS,
} from "constants/ActionTypes";
import {
    getAllHotwordsSuccess,
    hideHotwordsLoader,
} from "actions/Hotwords";

import ApiOutsideService from 'apiUtils/services/apiOutsideService'
import __ from "helpers/globalHelpers";

const getAllHotwordsRequest = async () =>
    await ApiOutsideService.reqGetAllHotWords();

function* getAllHotwordsHandler() {
    const failTitle = "Lấy danh sách xu hướng mua sắm thất bại";
    try {
        const hotwordsList = yield call(getAllHotwordsRequest);

        if (hotwordsList.message && hotwordsList.code !== 200) {
            __.createNotification(`${hotwordsList.code}: ${hotwordsList.message}`, failTitle, "error");
            yield put(hideHotwordsLoader())
        } else {
            yield put(getAllHotwordsSuccess(hotwordsList.data.hot_words));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideHotwordsLoader())
    }
}

export function* getAllHotwords() {
    yield takeEvery(GET_ALL_HOTWORDS, getAllHotwordsHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllHotwords)]);
}
