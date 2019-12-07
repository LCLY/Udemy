import * as actionTypes from "./actionTypes";
import axios from "axios";

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expirationTime");
	localStorage.removeItem("userId");
	return {
		type: actionTypes.AUTH_LOGOUT
	};
};

export const checkAuthTimeout = expiratonTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expiratonTime * 1000);
	};
};

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId
	};
};

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		error: error
	};
};

export const auth = (email, password, isSignUp) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true
		};
		let apiKey = "AIzaSyBGtLJrT9H_7v-IG6uOERB-Jxni6wnGlTo";
		let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
		if (!isSignUp) {
			// if its not sign up, then its sign in
			// use sign in API
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
		}
		axios
			.post(url, authData)
			.then(res => {
				console.log(res);
				// store token and expiration time in localstorage
				const expirationTime = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem("token", res.data.idToken);
				localStorage.setItem("expirationTime", expirationTime);
				localStorage.setItem("userId", res.data.localId); //this is the uid
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn)); //expiration time from firebase
			})
			.catch(err => {
				console.log(err);
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path: path
	};
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem("token");
		if (!token) {
			dispatch(logout());
		} else {
			// need to convert the date again since localstorage is json
			const expirationTime = new Date(localStorage.getItem("expirationTime"));
			if (expirationTime > new Date()) {
				const userId = localStorage.getItem("userId");
				dispatch(authSuccess(token, userId));
				// check out in the remaining time
				dispatch(
					checkAuthTimeout(
						(expirationTime.getTime() - new Date().getTime()) / 1000
					)
				);
			} else {
				dispatch(logout());
			}
		}
	};
};
