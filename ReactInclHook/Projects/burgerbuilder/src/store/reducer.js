import * as actionTypes from "./action";

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0
	},
	totalPrice: 4
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				// remember its nested, so we need to nest spread as well
				ingredients: {
					...state.ingredients,
					// in this case we are not hardcoding each of the ingredients name
					// we are just getting the name from the action payload and add its value
					// by 1 using its name
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				}
			};
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName] - 1
				}
			};
		default:
			return state;
	}
	// return state;
};

export default reducer;
