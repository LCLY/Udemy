import { takeEvery } from "redux-saga/effects";
//allow us to listen to certain actions and do something when they occur
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from "./auth";
import * as actionTypes from "../actions/actionTypes";
export function* watchAuth() {
	yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
	yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
	yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}
