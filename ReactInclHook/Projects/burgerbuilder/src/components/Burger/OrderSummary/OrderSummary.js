import React from "react";
import Button from "../../UI/Button/Button";
const OrderSummary = props => {
	// console.log("the price:", this.props.price);
	const ingredientSummary = Object.keys(props.ingredients).map(ingKey => {
		return (
			<li key={ingKey}>
				<span style={{ textTransform: "capitalize" }}>{ingKey}</span>:&nbsp;
				{props.ingredients[ingKey]}
			</li>
		);
	});
	return (
		<>
			<h3>Your Order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>{ingredientSummary}</ul>
			<p>Continue to Checkout?</p>
			<p>
				<strong>Total Price: {props.price.toFixed(2)}</strong>
			</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>
				CANCEL
			</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>
				CONTINUE
			</Button>
		</>
	);
};

export default OrderSummary;
