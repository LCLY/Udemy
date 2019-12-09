import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(props => {
	const { onLoadIngredients } = props;
	const [enteredFilter, setEnteredFilter] = useState("");
	const inputRef = useRef();
	useEffect(() => {
		// if user stop typing for 500ms then send request
		const timer = setTimeout(() => {
			// if the previous character we type is the same as current
			// then we didnt continue
			// the inputRef is to refer to the input
			// now inputRef is also a dependency because it could change
			if (enteredFilter === inputRef.current.value) {
				// firebase supports filtering with query params
				const query =
					enteredFilter.length === 0
						? ""
						: `?orderBy="title"&equalTo="${enteredFilter}"`;
				fetch(
					"https://react-hooks-812b9.firebaseio.com/ingredients.json" + query
				)
					.then(response => response.json())
					.then(responseData => {
						const loadedIngredients = [];
						for (let key in responseData) {
							loadedIngredients.push({
								id: key,
								title: responseData[key].title,
								amount: responseData[key].amount
							});
						}

						// here onLoadIngredients is a dependency
						onLoadIngredients(loadedIngredients);
					});
			}
		}, 500);
		// a clean up function
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadIngredients, inputRef]);

	return (
		<section className="search">
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					<input
						ref={inputRef}
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
