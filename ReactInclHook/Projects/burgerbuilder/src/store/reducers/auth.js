import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
	token: null,
	userId: null,
	error: null,
	loading: false
};

const authStart = (state, action) => {
	return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
	return updateObject(state, {
		// receive token from dispatched action
		token: action.idToken,
		userId: action.userId,
		error: null,
		loading: false
	});
};

const authFail = (state, action) => {
	// get the error and stop the loading
	return updateObject(state, { error: action.error, loading: false });
};

// reset the token and id after log out
const authLogout = (state, action) => {
	return updateObject(state, { token: null, userId: null });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return authStart(state, action);
		case actionTypes.AUTH_SUCCESS:
			return authSuccess(state, action);
		case actionTypes.AUTH_FAILED:
			return authFail(state, action);
		case actionTypes.AUTH_LOGOUT:
			return authLogout(state, action);
		default:
			return state;
	}
};

export default reducer;
