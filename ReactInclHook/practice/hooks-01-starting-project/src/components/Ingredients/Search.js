import React, { useState, useEffect, useCallback } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
	const { onLoadIngredients } = props;
	const [enteredFilter, setEnteredFilter] = useState("");

	useEffect(() => {
		// firebase supports filtering with query params
		const query =
			enteredFilter.length === 0
				? ""
				: `?orderBy="title"&equalTo="${enteredFilter}"`;
		fetch("https://react-hooks-812b9.firebaseio.com/ingredients.json" + query)
			.then(res => res.json())
			.then(responseData => {
				const loadedIngredients = [];
				for (let key in responseData) {
					loadedIngredients.push({
						id: key,
						title: responseData[key].ingredient.title,
						amount: responseData[key].ingredient.amount
					});
				}
				// here onLoadIngredients is a dependency
				onLoadIngredients(loadedIngredients);
			});
	}, [enteredFilter, onLoadIngredients]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input
						type="text"
						value={enteredFilter}
						onChange={e => setEnteredFilter(e.target.value)}
					/>
				</div>
			</Card>
		</section>
	);
});

export default Search;
