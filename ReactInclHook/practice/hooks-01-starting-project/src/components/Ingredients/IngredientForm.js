import React, { useState } from "react";

import Card from "../UI/Card";
import "./IngredientForm.css";
import LoadingIndicator from "../UI/LoadingIndicator";

const IngredientForm = React.memo(props => {
	const [enteredTitle, setEnteredTitle] = useState("");
	const [enteredAmount, setEnteredAmount] = useState("");
	console.log("RENDERING INGREDIENT FORM");
	const submitHandler = event => {
		event.preventDefault();
		props.onAddIngredient({ title: enteredTitle, amount: enteredAmount });
	};

	return (
		<section className="ingredient-form">
			<Card>
				<form onSubmit={submitHandler}>
					<div className="form-control">
						<label htmlFor="title">Name</label>
						<input
							type="text"
							id="title"
							value={enteredTitle}
							onChange={e => {
								setEnteredTitle(e.target.value);
							}}
						/>
					</div>
					<div className="form-control">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							id="amount"
							value={enteredAmount}
							onChange={e => {
								setEnteredAmount(e.target.value);
							}}
						/>
					</div>
					<div className="ingredient-form__actions">
						<button type="submit">Add Ingredient</button>
						{props.loading ? <LoadingIndicator /> : null}
						{/* or */}
						{/* both needs to be true in order to get true */}
						{/* {props.loading && <LoadingIndicator /> */}
					</div>
				</form>
			</Card>
		</section>
	);
});

export default IngredientForm;
