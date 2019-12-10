import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";
import "./Search.css";

const Search = React.memo(props => {
	const { onLoadIngredients } = props;
	const [enteredFilter, setEnteredFilter] = useState("");
	const inputRef = useRef();
	const { isLoading, data, error, sendRequest, clear } = useHttp();

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
				sendRequest(
					"https://react-hooks-812b9.firebaseio.com/ingredients.json" + query,
					"GET"
				);
			}
		}, 500);
		// a clean up function
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadIngredients, inputRef, sendRequest]);

	useEffect(() => {
		if (!isLoading && !error && data) {
			const loadedIngredients = [];
			for (let key in data) {
				loadedIngredients.push({
					id: key,
					title: data[key].title,
					amount: data[key].amount
				});
			}

			// here onLoadIngredients is a dependency
			onLoadIngredients(loadedIngredients);
		}
	}, [data, isLoading, error, onLoadIngredients]);
	return (
		<section className="search">
			{error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
			<Card>
				<div className="search-input">
					<label>Filter by Title</label>
					{isLoading && <span>Loading...</span>}
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
