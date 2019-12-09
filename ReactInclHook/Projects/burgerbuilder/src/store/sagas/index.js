import { takeEvery, all, takeLatest } from "redux-saga/effects";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
//allow us to listen to certain actions and do something when they occur
import {
	logoutSaga,
	checkAuthTimeoutSaga,
	authUserSaga,
	authCheckStateSaga
} from "./auth";
import * as actionTypes from "../actions/actionTypes";
import { initIngredientsSaga } from "./burgerBuilder";
export function* watchAuth() {
	yield all([
		takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
		takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
		takeEvery(actionTypes.AUTH_USER, authUserSaga),
		takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
	]);
}

export function* watchBurgerBuilder() {
	yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
	// only execute the latest one
	yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
	yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
