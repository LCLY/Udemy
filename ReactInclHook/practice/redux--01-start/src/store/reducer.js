const initialState = {
	counter: 0
};
const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "INCREMENT":
			return {
				counter: state.counter + 1
			};
		case "DECREMENT":
			return {
				counter: state.counter - 1
			};
		case "ADD":
			return {
				counter: state.counter + action.val
			};
		case "SUBTRACT":
			return {
				counter: state.counter - action.val
			};
	}

	// if (action.type === "INCREMENT") {
	// 	return {
	// 		...state,
	// 		counter: state.counter + 1
	// 	};
	// }
	// if (action.type === "DECREMENT") {
	// 	return {
	// 		...state,
	// 		counter: state.counter - 1
	// 	};
	// }
	// if (action.type === "ADD") {
	// 	return {
	// 		...state,
	// 		counter: state.counter + action.val
	// 	};
	// }
	// if (action.type === "SUBTRACT") {
	// 	return {
	// 		...state,
	// 		counter: state.counter - action.val
	// 	};
	// }
	return state;
};

export default reducer;
