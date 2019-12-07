import * as actionTypes from "./actionTypes";
import axios from "axios";

export const logout = () => {
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
