import React from "react";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component {
	componentWillUpdate() {
		console.log("[OrderSummary] update");
	}
	render() {
		console.log("the price:", this.props.price);
		const ingredientSummary = Object.keys(this.props.ingredients).map(
			ingKey => {
				return (
					<li key={ingKey}>
						<span style={{ textTransform: "capitalize" }}>{ingKey}</span>:&nbsp;
						{this.props.ingredients[ingKey]}
					</li>
				);
			}
		);
		return (
			<>
				<h3>Your Order</h3>
				<p>A delicious burger with the following ingredients:</p>
				<ul>{ingredientSummary}</ul>
				<p>Continue to Checkout?</p>
				<p>
					<strong>Total Price: {this.props.price.toFixed(2)}</strong>
				</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>
					CANCEL
				</Button>
				<Button btnType="Success" clicked={this.props.purchaseContinued}>
					CONTINUE
				</Button>
			</>
		);
	}
}

export default OrderSummary;
