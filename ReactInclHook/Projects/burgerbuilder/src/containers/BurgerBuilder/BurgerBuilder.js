import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false
	};

	updatePurchaseState = updatedIngredients => {
		const ingredients = updatedIngredients;
		const sum = Object.keys(ingredients)
			.map(ingKey => {
				// here we will be getting number of ingredients
				return ingredients[ingKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		this.setState({ purchasable: sum > 0 });
	};

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		// make a copy of the object
		const updatedIngredients = {
			...this.state.ingredients
		};
		// then replace the type's count with the new count
		updatedIngredients[type] = updatedCount;
		let priceAddition = INGREDIENT_PRICES[type];
		let oldPrice = this.state.totalPrice;
		let newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			// do nothing
			return;
		}
		const updatedCount = oldCount - 1;
		// make a copy of the object
		const updatedIngredients = {
			...this.state.ingredients
		};
		// then replace the type's count with the new count
		updatedIngredients[type] = updatedCount;
		let priceAddition = INGREDIENT_PRICES[type];
		let oldPrice = this.state.totalPrice;
		let newPrice = oldPrice - priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	};
	render() {
		const disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo) {
			// this will return true its <= 0
			disabledInfo[key] = disabledInfo[key] <= 0;
			// {salad: true, meat: true}
		}
		return (
			<>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					purchasable={this.state.purchasable}
					disabled={disabledInfo}
					price={this.state.totalPrice}
				/>
			</>
		);
	}
}

export default BurgerBuilder;
