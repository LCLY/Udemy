import rootReducer from "./index";
import * as actions from "../actions";
import { categories, category } from "../data/fixtures";

describe("root reducer", () => {
	it("returns the initial state", () => {
		// 1st argument is the prevState and 2nd argument is action object
		expect(rootReducer({}, {})).toEqual({
			categoriesReducer: [],
			categoryReducer: {}
		});
	});
	it("sets the categories", () => {
		expect(
			rootReducer({}, { type: actions.SET_CATEGORIES, categories })
		).toEqual({
			categoriesReducer: categories,
			categoryReducer: {}
		});
	});
	it("picks a category", () => {
		expect(rootReducer({}, { type: actions.PICK_CATEGORY, category })).toEqual({
			categoriesReducer: [],
			categoryReducer: category
		});
	});
});
