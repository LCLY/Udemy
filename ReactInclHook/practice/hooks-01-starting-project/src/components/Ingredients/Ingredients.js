import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
const Ingredients = () => {
	const [userIngredients, setUserIngredients] = useState([]);
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
				setUserIngredients(prevIngredients => [
					...prevIngredients,
					// .name is the unique id provided by firebase
					{ id: responseData.name, ...ingredient }
				]);
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
				setUserIngredients(prevIngredients =>
					prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
				);
			})
			.catch(err => {
				setIsLoading(false); //stop loading
				setError(err.message);
			});
	};

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		setUserIngredients(filteredIngredients);
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
