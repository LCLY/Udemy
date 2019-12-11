import { useState, useEffect } from "react";
// some local variables
// any files that uses store.js shares these values
let globalState = {};
let listeners = [];
let actions = {};

// this is custom hook
export const useStore = (shouldListen = true) => {
	// accessing the function [1]
	const setState = useState(globalState)[1];

	const dispatch = (actionIdentifier, payload) => {
		// getting the function of the dispatched actions
		const newState = actions[actionIdentifier](globalState, payload);
		// update the state
		globalState = { ...globalState, ...newState };

		for (const listener of listeners) {
			// this is just from the setState calls, line 11
			// here we are using setState to rerender any component that uses that state
			listener(globalState);
		}
	};
	useEffect(() => {
		// only if shouldListen is true, we change the state
		if (shouldListen) {
			listeners.push(setState);
		}

		return () => {
			listeners = listeners.filter(li => li !== setState);
		};
	}, [setState, shouldListen]);

	return [globalState, dispatch];
};

// initializing the store
// we are adding instead of replacing the state and actions
export const initStore = (userActions, initialState) => {
	if (initialState) {
		globalState = { ...globalState, ...initialState };
	}
	actions = { ...actions, ...userActions };
};
