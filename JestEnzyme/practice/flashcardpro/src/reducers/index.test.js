import rootReducer from "./index"; //here its combineReducers from reducer/index.js
import * as actions from "../actions";
import { stack, stacks } from "../data/fixtures";

describe("root reducer", () => {
	it("returns the initial state", () => {
		expect(rootReducer({}, {})).toEqual({
			stackReducer: {},
			loadStackReducer: []
		});
	});

	it("sets the main stack", () => {
		expect(rootReducer({}, { type: actions.SET_STACK, stack })).toEqual({
			stackReducer: stack,
			loadStackReducer: []
		});
	});

	it("loads stacks", () => {
		expect(rootReducer({}, { type: actions.LOAD_STACKS, stacks })).toEqual({
			stackReducer: {},
			loadStackReducer: stacks
		});
	});

	it("adds a stack", () => {
		expect(rootReducer({}, { type: actions.ADD_STACK, stack })).toEqual({
			stackReducer: {},
			loadStackReducer: [stack]
		});
	});
});
