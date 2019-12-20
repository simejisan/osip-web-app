import {all} from 'redux-saga/effects';
import authSagas from './Auth';
import funcSagas from './Function';
import roleSagas from './Role';
import hotwordsSagas from './Hotwords'
import accountSagas from './Account'
import promotionSagas from './Promotion'
import suggestionSagas from './Suggestion'
import favoriteSagas from './Favorite'
import flashsaleSagas from './Flashsale'

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        funcSagas(),
        roleSagas(),
        hotwordsSagas(),
        accountSagas(),
        promotionSagas(),
        suggestionSagas(),
        favoriteSagas(),
        flashsaleSagas()
    ]);
}
