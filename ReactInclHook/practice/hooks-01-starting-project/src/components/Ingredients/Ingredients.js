import React, { useReducer, useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients, action) => {
	switch (action.type) {
		case "SET":
			return action.ingredients;
		case "ADD":
			return [...currentIngredients, action.ingredients];
		case "DELETE":
			return currentIngredients.filter(ing => ing.id !== action.id);
		default:
			throw new Error("Should not get here");
	}
};

const httpReducer = (currHttpState, action) => {
	switch (action.type) {
		case "SEND":
			return { isLoading: true, error: null };
		case "RESPONSE":
			return { ...currHttpState, isLoading: false, error: null };
		case "ERROR":
			return { isLoading: false, error: action.error };
		case "CLEAR":
			return { ...currHttpState, error: null };
		default:
			throw new Error("Should not get here");
	}
};

const Ingredients = () => {
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		isLoading: false,
		error: null
	});
	// const [userIngredients, setUserIngredients] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);
	// const [error, setError] = useState();
	useEffect(() => {
		// console.log("rendering", userIngredients);
	}, [userIngredients]);

	const addIngredientHandler = ingredient => {
		// setIsLoading(true);
		dispatchHttp({ type: "SEND" });
		fetch("https://react-hooks-812b9.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify(ingredient),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				// setIsLoading(false);
				dispatchHttp({ type: "RESPONSE" });
				// extract body
				return res.json();
			})
			.then(responseData => {
				// adding a new ingredient to the previous existing ingredients
				// setUserIngredients(prevIngredients => [
				// 	...prevIngredients,
				// 	// .name is the unique id provided by firebase
				// 	{ id: responseData.name, ...ingredient }
				// ]);
				dispatch({
					type: "ADD",
					ingredients: { id: responseData.name, ...ingredient }
				});
			});
	};

	const removeIngredientHandler = ingredientId => {
		// setIsLoading(true);
		dispatchHttp({ type: "SEND" });
		fetch(
			`https://react-hooks-812b9.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: "DELETE"
			}
		)
			.then(res => {
				// setIsLoading(false);
				dispatchHttp({ type: "RESPONSE" });
				// setUserIngredients(prevIngredients =>
				// 	prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
				// );
				dispatch({ type: "DELETE", id: ingredientId });
			})
			.catch(err => {
				// setIsLoading(false); //stop loading
				dispatchHttp({ type: "ERROR", error: "SOMETHINGS WRONG" });
				// setError(err.message);
			});
	};

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		// setUserIngredients(filteredIngredients);
		dispatch({ type: "SET", ingredients: filteredIngredients });
	}, []);

	const clearError = () => {
		dispatchHttp({ type: "CLEAR" });
	};
	return (
		<div className="App">
			{httpState.error && (
				<ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
			)}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={httpState.isLoading}
			/>

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList
					ingredients={userIngredients}
					onRemoveItem={removeIngredientHandler}
				/>
			</section>
		</div>
	);
};

export default Ingredients;
