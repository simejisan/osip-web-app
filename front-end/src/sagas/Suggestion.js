import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    GET_ALL_SUGGESTION,
} from "constants/ActionTypes";
import {
    getAllSuggestionSuccess,
    hideSuggestionLoader,
} from "actions/Suggestion";

import ApiOutsideService from 'apiUtils/services/apiOutsideService'
import __ from "helpers/globalHelpers";

const getAllSuggestionRequest = async (keyword) =>
    await ApiOutsideService.reqGetAllSuggests(keyword);

function* getAllSuggestionHandler({payload}) {
    const failTitle = "Lấy danh sách gợi ý từ khoá thất bại";
    try {
        const suggestionList = yield call(getAllSuggestionRequest, payload);

        if (suggestionList.message && suggestionList.code !== 200) {
            __.createNotification(`${suggestionList.code}: ${suggestionList.message}`, failTitle, "error");
            yield put(hideSuggestionLoader())
        } else {
            yield put(getAllSuggestionSuccess(suggestionList.data.suggest_words));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideSuggestionLoader())
    }
}

export function* getAllSuggestion() {
    yield takeEvery(GET_ALL_SUGGESTION, getAllSuggestionHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllSuggestion)]);
}
