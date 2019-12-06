import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false
};
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			/*	
			// Old way of doing it
				return {
				...state,
				// remember its nested, so we need to nest spread as well
				ingredients: {
					...state.ingredients,
					// in this case we are not hardcoding each of the ingredients name
					// we are just getting the name from the action payload and add its value
					// by 1 using its name
					[action.ingredientName]: state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};*/

			// using the updatedObject function
			const updatedIngredient = {
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1
			};

			const updatedIngredients = updateObject(
				state.ingredients,
				updatedIngredient
			);

			const updatedState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};

			return updateObject(state, updatedState);

		case actionTypes.REMOVE_INGREDIENT:
			// return {
			// 	...state,
			// 	ingredients: {
			// 		...state.ingredients,
			// 		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
			// 	},
			// 	totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			// };
			const removedIngredient = {
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1
			};
			const removedIngredients = updateObject(
				state.ingredients,
				removedIngredient
			);
			const removedState = {
				ingredients: removedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};

			return updateObject(state, removedState);

		case actionTypes.SET_INGREDIENTS:
			// return {
			// 	...state,
			// 	ingredients: action.ingredients,
			// 	totalPrice: 4,
			// 	error: false
			// };
			return updateObject(state, {
				ingredients: action.ingredients,
				totalPrice: 4,
				error: false
			});

		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return updateObject(state, { error: true });
		default:
			return state;
	}
	// return state;
};

export default reducer;
