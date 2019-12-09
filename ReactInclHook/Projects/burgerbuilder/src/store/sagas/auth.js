import { put } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
// * change function into generator (ES7)
// function that can be executed incrementally
// you can pause during the execution of the function to wait for asynchronous code to finish
export function* logoutSaga(action) {
	// we want to do the localstorage removing part here
	yield localStorage.removeItem("token");
	yield localStorage.removeItem("expirationTime");
	yield localStorage.removeItem("userId");
	yield put({
		type: actionTypes.AUTH_LOGOUT
	});
}
