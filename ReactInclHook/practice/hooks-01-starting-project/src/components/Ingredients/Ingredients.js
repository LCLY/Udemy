import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

const Ingredients = () => {
	const [userIngredients, setUserIngredients] = useState([]);
	const addIngredientHandler = ingredient => {
		fetch("https://react-hooks-812b9.firebaseio.com/ingredients.json", {
			method: "POST",
			body: JSON.stringify({ ingredient }),
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

	return (
		<div className="App">
			<IngredientForm onAddIngredient={addIngredientHandler} />

			<section>
				<Search />
				<IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
			</section>
		</div>
	);
};

export default Ingredients;
