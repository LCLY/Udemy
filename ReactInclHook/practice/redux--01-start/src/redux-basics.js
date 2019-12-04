const redux = require("redux");
const createStore = redux.createStore;
const initialState = {
	counter: 0
};
// Reducer
// here we are initializing a state
const rootReducer = (state = initialState, action) => {
	if (action.type === "INC_COUNTER") {
		return {
			...state,
			counter: state.counter + 1
		};
	}
	if (action.type === "ADD_COUNTER") {
		return {
			...state,
			counter: state.counter + action.value
		};
	}
	return state;
};

// Store
// reducers are strongly connected to store, so we initialize reducer first
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription - takes an argument, a function which will be
// executed when ever the state is updated
store.subscribe(() => {
	console.log("[Subscription]", store.getState());
});

// Dispatching Action
// type: what type of action to be dispatched, all UPPERCASE
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log(store.getState());
