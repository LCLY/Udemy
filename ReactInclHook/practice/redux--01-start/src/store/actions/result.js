import * as actionTypes from "./actionTypes";

export const saveResult = res => {
	// const updatedResult = res * 2;

	return {
		type: actionTypes.STORE_RESULT,
		result: res
	};
};
export const storeResult = res => {
	// we can do this bcoz of redux thunk
	return (dispatch, getState) => {
		setTimeout(() => {
			// with the 2nd argument getState, we can get the state before dispatching actions
			// const oldCounter = getState().ctr.counter;
			// console.log(oldCounter);
			dispatch(saveResult(res));
		}, 2000);
	};
};
export const deleteResult = resElId => {
	return {
		type: actionTypes.DELETE_RESULT,
		resultElementId: resElId
	};
};
