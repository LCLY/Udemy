export const SET_STACK = "SET_STACK";
export const LOAD_STACKS = "LOAD_STACKS";

export const setStack = stack => {
	return {
		type: SET_STACK,
		stack: stack
	};
};
export const loadStacks = stacks => {
	return {
		type: LOAD_STACKS,
		stacks: stacks
	};
};
