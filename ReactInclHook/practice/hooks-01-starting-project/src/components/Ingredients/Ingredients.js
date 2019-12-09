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

const Ingredients = () => {
	const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
	// const [userIngredients, setUserIngredients] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	useEffect(() => {
		console.log("rendering", userIngredients);
	}, [userIngredients]);

	const addIngredientHandler = ingredient => {
		setIsLoading(true);
		fetch("https://react-hooks-812b9.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify(ingredient),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				setIsLoading(false);
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
		setIsLoading(true);
		fetch(
			`https://react-hooks-812b9.firebaseio.com/ingredients/${ingredientId}.json`,
			{
				method: "DELETE"
			}
		)
			.then(res => {
				setIsLoading(false);
				// setUserIngredients(prevIngredients =>
				// 	prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
				// );
				dispatch({ type: "DELETE", id: ingredientId });
			})
			.catch(err => {
				setIsLoading(false); //stop loading
				setError(err.message);
			});
	};

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		// setUserIngredients(filteredIngredients);
		dispatch({ type: "SET", ingredients: filteredIngredients });
	}, []);

	const clearError = () => {
		setError(null);
	};
	return (
		<div className="App">
			{error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
			<IngredientForm
				onAddIngredient={addIngredientHandler}
				loading={isLoading}
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
