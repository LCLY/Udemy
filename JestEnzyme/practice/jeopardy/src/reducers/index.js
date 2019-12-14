import { SET_CATEGORIES, PICK_CATEGORY } from "../actions/index";
import { combineReducers } from "redux";

function categoriesReducer(state = [], action) {
	switch (action.type) {
		case SET_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
}
function categoryReducer(state = [], action) {
	switch (action.type) {
		case PICK_CATEGORY:
			return action.category;
		default:
			return state;
	}
}

export default combineReducers({ categoriesReducer, categoryReducer });
