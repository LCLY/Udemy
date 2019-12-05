import * as actionTypes from "../actions";
const initialState = {
	persons: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_PERSON:
			const newPerson = {
				id: Math.random(), // not really unique but good enough here!
				name: "Max",
				age: Math.floor(Math.random() * 40)
			};
			return {
				...state,
				persons: state.persons.concat(newPerson)
			};
		case actionTypes.DELETE_PERSON:
			const updatedArray = state.persons.filter(
				// return it if the id is not the id that we passed from component so it wont be deleted
				result => result.id !== action.personId
			);
			return {
				...state,
				persons: updatedArray
			};
	}
	return state;
};

export default reducer;
