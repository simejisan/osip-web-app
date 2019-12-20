import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    GET_ALL_FLASHSALE,
} from "constants/ActionTypes";
import {
    getAllFlashsaleSuccess,
    hideFlashsaleLoader,
} from "actions/Flashsale";

import ApiOutsideService from 'apiUtils/services/apiOutsideService'
import __ from "helpers/globalHelpers";

const getAllFlashsaleRequest = async (info) => {
    const {source, offset, limit} = info;
    return await ApiOutsideService.reqGetAllFlashsale(source, offset, limit);
};

function* getAllFlashsaleHandler({payload}) {
    const failTitle = "Lấy danh sách các thông tin giảm giá nhanh thất bại";
    try {
        const flashsaleList = yield call(getAllFlashsaleRequest, payload);

        if (flashsaleList.message && flashsaleList.code !== 200) {
            __.createNotification(`${flashsaleList.code}: ${flashsaleList.message}`, failTitle, "error");
            yield put(hideFlashsaleLoader())
        } else {
            yield put(getAllFlashsaleSuccess(flashsaleList.data.flash_sales));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hideFlashsaleLoader())
    }
}

export function* getAllFlashsale() {
    yield takeEvery(GET_ALL_FLASHSALE, getAllFlashsaleHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllFlashsale)]);
}
