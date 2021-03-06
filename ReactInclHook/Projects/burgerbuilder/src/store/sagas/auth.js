import { put, delay, call } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";
// * change function into generator (ES7)
// function that can be executed incrementally
// you can pause during the execution of the function to wait for asynchronous code to finish
export function* logoutSaga(action) {
	// this makes generator testable
	yield call([localStorage, "removeItem"], "token");
	yield call([localStorage, "removeItem"], "expirationTime");
	yield call([localStorage, "removeItem"], "userId");
	// we want to do the localstorage removing part here
	// yield localStorage.removeItem("token");
	// yield localStorage.removeItem("expirationTime");
	// yield localStorage.removeItem("userId");
	yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
	yield delay(action.expiratonTime * 1000);
	yield put(actions.logout);
}

export function* authUserSaga(action) {
	yield put(actions.authStart());

	const authData = {
		email: action.email,
		password: action.password,
		returnSecureToken: true
	};
	let apiKey = "AIzaSyBGtLJrT9H_7v-IG6uOERB-Jxni6wnGlTo";
	let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
	if (!action.isSignUp) {
		// if its not sign up, then its sign in
		// use sign in API
		url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
	}
	try {
		const response = yield axios.post(url, authData);

		// store token and expiration time in localstorage
		const expirationTime = yield new Date(
			new Date().getTime() + response.data.expiresIn * 1000
		);
		yield localStorage.setItem("token", response.data.idToken);
		yield localStorage.setItem("expirationTime", expirationTime);
		yield localStorage.setItem("userId", response.data.localId); //this is the uid
		yield put(
			actions.authSuccess(response.data.idToken, response.data.localId)
		);
		yield put(actions.checkAuthTimeout(response.data.expiresIn)); //expiration time from firebase
	} catch (err) {
		yield put(actions.authFail(err.response.data.error));
	}
}

export function* authCheckStateSaga(action) {
	const token = yield localStorage.getItem("token");
	if (!token) {
		yield put(actions.logout());
	} else {
		// need to convert the date again since localstorage is json
		const expirationTime = yield new Date(
			localStorage.getItem("expirationTime")
		);
		if (expirationTime > new Date()) {
			const userId = yield localStorage.getItem("userId");
			yield put(actions.authSuccess(token, userId));
			// check out in the remaining time
			yield put(
				actions.checkAuthTimeout(
					(expirationTime.getTime() - new Date().getTime()) / 1000
				)
			);
		} else {
			yield put(actions.logout());
		}
	}
}
