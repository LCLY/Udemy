import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error: error
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post("/orders.json", orderData)
			.then(res => {
				// this is used to be in ContactData.js
				// console.log(res);
				// this.setState({ loading: false });
				// we will need to pass props into the render in checkout.js in order to obtain the props history
				// <Route
				//  	path={this.props.match.path + "/contact-data"}
				//  	render={props => (
				// 	 	<ContactData
				// 			ingredients={this.state.ingredients}
				// 			price={this.state.totalPrice}
				// 			{...props}
				// 		/>
				// 	)}
				// />
				// this.props.history.push("/"); //redirect to homepage
				console.log(res.data);
				dispatch(purchaseBurgerSuccess(res.data, orderData));
			})
			.catch(err => {
				dispatch(purchaseBurgerFail(err));
			});
	};
};
