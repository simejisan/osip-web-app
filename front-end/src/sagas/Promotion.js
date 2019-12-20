import {all, call, fork, put, takeEvery} from "redux-saga/effects";
import {
    GET_ALL_PROMOTION
} from "constants/ActionTypes";
import {
    getAllPromotionSuccess,
    hidePromotionLoader,
} from "actions/Promotion";
import ApiOutsideService from 'apiUtils/services/apiOutsideService'
import __ from "helpers/globalHelpers";

const getAllPromotionRequest = async (filter) => {
    const {sortType, screenType, offset, limit, province} = filter;
    return await ApiOutsideService.reqGetAllPromotions(sortType, screenType, offset, limit, province);
};

function* getAllPromotionHandler({payload}) {
    const failTitle = "Lấy danh sách mã khuyến mại thất bại";
    try {
        const promotionList = yield call(getAllPromotionRequest, payload);

        if (promotionList.message && promotionList.code !== 200) {
            __.createNotification(`${promotionList.code}: ${promotionList.message}`, failTitle, "error");
            yield put(hidePromotionLoader())
        } else {
            yield put(getAllPromotionSuccess(promotionList.data.promotions));
        }
    } catch (error) {
        __.createNotification(error.toString(), failTitle, "error");
        yield put(hidePromotionLoader())
    }
}

export function* getAllPromotions() {
    yield takeEvery(GET_ALL_PROMOTION, getAllPromotionHandler);
}

export default function* rootSaga() {
    yield all([fork(getAllPromotions)
    ]);
}
