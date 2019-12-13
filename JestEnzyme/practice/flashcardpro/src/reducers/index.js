import { SET_STACK } from "../actions";
const stackReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_STACK:
			return action.stack;
		default:
			return state;
	}
};

export default stackReducer;
