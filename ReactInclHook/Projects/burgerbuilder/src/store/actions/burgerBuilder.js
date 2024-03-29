import * as actionTypes from "./actionTypes";
// import axios from "../../axios-orders";

export const addIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const removeIngredient = name => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredientName: name
	};
};

export const setIngredients = ingredients => {
	return {
		type: actionTypes.SET_INGREDIENTS,
		ingredients: ingredients
	};
};

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAILED
	};
};

// export const initIngredients = () => {
// 	return dispatch => {
// 		// execute async code
// 		axios
// 			.get("https://react-burger-699a0.firebaseio.com/ingredients.json")
// 			.then(res => dispatch(setIngredients(res.data)))
// 			.catch(err => dispatch(fetchIngredientsFailed()));
// 	};
// };

// redux-sagas
export const initIngredients = () => {
	return {
		type: actionTypes.INIT_INGREDIENTS
	};
};
