import React, { useState, useEffect, useCallback } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useDispatch, useSelector } from "react-redux";
// import * as actionTypes from "../../store/action";
import * as actions from "../../store/actions/index";

import axios from "../../axios-orders";

export const BurgerBuilder = props => {
	// state = {
	// 	// ingredients: null, //removed since we are using redux now
	// 	// totalPrice: 4,
	// 	// purchasable: false,
	// 	purchasing: false
	// 	// loading: false,
	// 	// error: false
	// };
	const [purchasing, setPurchasing] = useState(false);

	const dispatch = useDispatch();
	// instead of using dispatch from mapDispatchToProps, we are using it from useDispatch
	// using useDipatch and useSelector
	const onIngredientAdded = ingName => dispatch(actions.addIngredient(ingName));
	const onIngredientRemoved = ingName =>
		dispatch(actions.removeIngredient(ingName));
	const onInitIngredients = useCallback(
		() => dispatch(actions.initIngredients()),
		[dispatch]
	);
	const onInitPurchase = () => dispatch(actions.purchaseInit());
	const onSetAuthRedirectPath = path =>
		dispatch(actions.setAuthRedirectPath(path));

	const ings = useSelector(state => {
		return state.burgerBuilder.ingredients;
	});
	const price = useSelector(state => {
		return state.burgerBuilder.totalPrice;
	});
	const error = useSelector(state => {
		return state.burgerBuilder.error;
	});
	const isAuthenticated = useSelector(state => {
		return state.auth.token !== null;
	});

	// now we dont need props to access the dispatch functions anymore
	// const { onInitIngredients } = props;

	useEffect(() => {
		onInitIngredients(); //causing app to keep rerendering, need to apply useCallback
	}, [onInitIngredients]);

	// componentDidMount() {
	// 	this.props.onInitIngredients();
	// }

	const updatePurchaseState = updatedIngredients => {
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
	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			// if not then go to sign in page
			onSetAuthRedirectPath("/checkout");
			props.history.push("/auth");
		}
	};
	const closeModal = () => {
		setPurchasing(false);
	};

	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};
	const purchaseContinueHandler = () => {
		onInitPurchase();
		props.history.push("/checkout");
	};

	const disabledInfo = {
		// getting data from redux ings
		...ings
	};
	for (let key in disabledInfo) {
		// this will return true its <= 0
		disabledInfo[key] = disabledInfo[key] <= 0;
		// {salad: true, meat: true}
	}

	let orderSummary = null;
	let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
	if (ings) {
		burger = (
			<>
				<Burger ingredients={ings} />
				<BuildControls
					ingredientAdded={onIngredientAdded}
					ingredientRemoved={onIngredientRemoved}
					// get true if there is more than 1 ingredient
					purchasable={updatePurchaseState(ings)}
					disabled={disabledInfo}
					ordered={purchaseHandler}
					isAuth={isAuthenticated}
					price={price}
				/>
			</>
		);

		orderSummary = (
			<OrderSummary
				purchaseCancelled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
				ingredients={ings}
				price={price}
			/>
		);
	}
	// we are using redux now
	// if (this.state.loading) {
	// 	orderSummary = <Spinner />;
	// }

	return (
		<>
			<Modal show={purchasing} modalClosed={closeModal}>
				{orderSummary}
			</Modal>
			{burger}
		</>
	);
};

// const mapStateToProps = state => {
// 	return {
// 		ings: state.burgerBuilder.ingredients,
// 		price: state.burgerBuilder.totalPrice,
// 		error: state.burgerBuilder.error,
// 		isAuthenticated: state.auth.token !== null
// 	};
// };

// const mapDispatchToProps = dispatch => {
// 	return {
// 		onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
// 		onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
// 		onInitIngredients: () => dispatch(actions.initIngredients()),
// 		onInitPurchase: () => dispatch(actions.purchaseInit()),
// 		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
// 	};
// };

export default withErrorHandler(BurgerBuilder, axios);
