import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";
const initialState = {
	results: []
};

const deleteResult = (state, action) => {
	const updatedArray = state.results.filter(
		result => result.id !== action.resultElementId
	);
	return updateObject(state, { results: updatedArray });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.STORE_RESULT:
			// concat returns a new array with new items you added to old arrays
			return updateObject(state, {
				results: state.results.concat({ id: new Date(), value: action.result })
			});

		case actionTypes.DELETE_RESULT:
			// delete array immutably
			// const newArray = [...state.result];
			// newArray.splice(id, 1);

			// filter returns a new array
			// it takes function as input, the function is executed on each element in the array
			// it determines whether this element fulfils a certain condition to make it into
			// the new array which is returned by filter or not

			// *** to use filter to delete element, we return true for every element that doesnt
			// have a certain ID or which is not a certain index here
			// const updatedArray = state.results.filter(
			// return true if that index is not equal to the index of element that we want to remove it at
			// (result, index) => index !== id
			// OR
			// instead of using the index, we can use the id that we set in the state object
			// result => result.id !== action.resultElementId
			// );
			return deleteResult(state, action);
	}
	return state;
};

export default reducer;
