import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
	const [userIngredients, setUserIngredients] = useState([]);

	// dont need this, its redundant
	// useEffect(() => {
	// 	fetch("https://react-hooks-812b9.firebaseio.com/ingredients.json")
	// 		.then(res => res.json())
	// 		.then(responseData => {
	// 			const loadedIngredients = [];
	// 			for (let key in responseData) {
	// 				loadedIngredients.push({
	// 					id: key,
	// 					title: responseData[key].ingredient.title,
	// 					amount: responseData[key].ingredient.amount
	// 				});
	// 			}

	// 			setUserIngredients(loadedIngredients);
	// 		});
	// }, []);

	useEffect(() => {
		console.log("rendering", userIngredients);
	}, [userIngredients]);

	const addIngredientHandler = ingredient => {
		fetch("https://react-hooks-812b9.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify(ingredient),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
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

	const filteredIngredientsHandler = useCallback(filteredIngredients => {
		setUserIngredients(filteredIngredients);
	}, []);

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search onLoadIngredients={filteredIngredientsHandler} />
				<IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
			</section>
		</div>
	);
};

export default Ingredients;
