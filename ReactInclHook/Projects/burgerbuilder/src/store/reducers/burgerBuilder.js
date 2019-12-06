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
const addIngredient = (state, action) => {
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

	const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

	const updatedState = {
		ingredients: updatedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
	};
	return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
	// old way
	// return {
	// 	...state,
	// 	ingredients: {
	// 		...state.ingredients,
	// 		[action.ingredientName]: state.ingredients[action.ingredientName] - 1
	// 	},
	// 	totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
	// };

	// new way
	const removedIngredient = {
		[action.ingredientName]: state.ingredients[action.ingredientName] + 1
	};
	const removedIngredients = updateObject(state.ingredients, removedIngredient);
	const removedState = {
		ingredients: removedIngredients,
		totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
	};

	return updateObject(state, removedState);
};

const setIngredients = (state, action) => {
	// old
	// return {
	// 	...state,
	// 	ingredients: action.ingredients,
	// 	totalPrice: 4,
	// 	error: false
	// };

	// new
	return updateObject(state, {
		ingredients: action.ingredients,
		totalPrice: 4,
		error: false
	});
};

const fetchIngredientFailed = (state, action) => {
	return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGREDIENT:
			// splitting into smaller functions
			return addIngredient(state, action);
		case actionTypes.REMOVE_INGREDIENT:
			return removeIngredient(state, action);
		case actionTypes.SET_INGREDIENTS:
			return setIngredients(state, action);
		case actionTypes.FETCH_INGREDIENTS_FAILED:
			return fetchIngredientFailed(state, action);
		default:
			return state;
	}
	// return state;
};

export default reducer;
