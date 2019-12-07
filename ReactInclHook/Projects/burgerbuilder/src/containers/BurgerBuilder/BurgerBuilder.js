import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
// import * as actionTypes from "../../store/action";
import * as actions from "../../store/actions/index";

import axios from "../../axios-orders";

class BurgerBuilder extends Component {
	state = {
		// ingredients: null, //removed since we are using redux now
		// totalPrice: 4,
		// purchasable: false,
		purchasing: false
		// loading: false,
		// error: false
	};

	componentDidMount() {
		this.props.onInitIngredients();
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
		return sum > 0;
	};

	// dont need anymore since we are using redux

	// addIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	const updatedCount = oldCount + 1;
	// 	// make a copy of the object
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	// then replace the type's count with the new count
	// 	updatedIngredients[type] = updatedCount;
	// 	let priceAddition = INGREDIENT_PRICES[type];
	// 	let oldPrice = this.state.totalPrice;
	// 	let newPrice = oldPrice + priceAddition;
	// 	this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	// removeIngredientHandler = type => {
	// 	const oldCount = this.state.ingredients[type];
	// 	if (oldCount <= 0) {
	// 		// do nothing
	// 		return;
	// 	}
	// 	const updatedCount = oldCount - 1;
	// 	// make a copy of the object
	// 	const updatedIngredients = {
	// 		...this.state.ingredients
	// 	};
	// 	// then replace the type's count with the new count
	// 	updatedIngredients[type] = updatedCount;
	// 	let priceAddition = INGREDIENT_PRICES[type];
	// 	let oldPrice = this.state.totalPrice;
	// 	let newPrice = oldPrice - priceAddition;
	// 	this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
	// 	this.updatePurchaseState(updatedIngredients);
	// };
	purchaseHandler = () => {
		if (this.props.isAuthenticated) {
			this.setState({ purchasing: true });
		} else {
			// if not then go to sign in page
			this.props.onSetAuthRedirectPath("/checkout");
			this.props.history.push("/auth");
		}
	};
	closeModal = () => {
		this.setState({ purchasing: false });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};
	purchaseContinueHandler = () => {
		this.props.onInitPurchase();
		this.props.history.push("/checkout");
	};
	render() {
		const disabledInfo = {
			// getting data from redux ings
			...this.props.ings
		};
		for (let key in disabledInfo) {
			// this will return true its <= 0
			disabledInfo[key] = disabledInfo[key] <= 0;
			// {salad: true, meat: true}
		}

		let orderSummary = null;
		let burger = this.props.error ? (
			<p>Ingredients can't be loaded</p>
		) : (
			<Spinner />
		);
		if (this.props.ings) {
			burger = (
				<>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						// get true if there is more than 1 ingredient
						purchasable={this.updatePurchaseState(this.props.ings)}
						disabled={disabledInfo}
						ordered={this.purchaseHandler}
						isAuth={this.props.isAuthenticated}
						price={this.props.price}
					/>
				</>
			);

			orderSummary = (
				<OrderSummary
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.props.ings}
					price={this.props.price}
				/>
			);
		}
		// we are using redux now
		// if (this.state.loading) {
		// 	orderSummary = <Spinner />;
		// }

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

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
		onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
