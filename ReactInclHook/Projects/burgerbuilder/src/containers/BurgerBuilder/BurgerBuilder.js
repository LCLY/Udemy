import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";
const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
};

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		axios
			.get("https://react-burger-699a0.firebaseio.com/ingredients.json")
			.then(res => this.setState({ ingredients: res.data }))
			.catch(err => this.setState({ error: true }));
	}

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
	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};
	closeModal = () => {
		this.setState({ purchasing: false });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};
	purchaseContinueHandler = () => {
		// alert("You continue");
		this.setState({ loading: true });
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Henry",
				address: {
					street: "St 400",
					zipCode: "47906",
					country: "United States"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};
		axios
			.post("/orders.json", order)
			.then(res => {
				console.log(res);
				this.setState({ loading: false, purchasing: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false, purchasing: false });
			});
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

		let orderSummary = null;
		let burger = this.state.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						purchasable={this.state.purchasable}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</>
			);

			orderSummary = (
				<OrderSummary
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.state.ingredients}
					price={this.state.totalPrice}
				/>
			);
		}

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<>
				<Modal show={this.state.purchasing} modalClosed={this.closeModal}>
					{orderSummary}
				</Modal>
				{burger}
			</>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
