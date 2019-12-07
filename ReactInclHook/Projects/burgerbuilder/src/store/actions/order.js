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

// add token here
export const purchaseBurger = (orderData, token) => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post("/orders.json?auth=" + token, orderData)
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
				// console.log(res.data);
				dispatch(purchaseBurgerSuccess(res.data.name, orderData));
			})
			.catch(err => {
				dispatch(purchaseBurgerFail(err));
			});
	};
};

export const purchaseInit = () => {
	return { type: actionTypes.PURCHASE_INIT };
};

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders: orders
	};
};
export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAIL,
		error: error
	};
};
export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	};
};
export const fetchOrders = (token, userId) => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		// order the results with userid equal to userid, the syntax is provided by firebase
		const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
		axios
			.get("/orders.json" + queryParams)
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					// for every iteration, we add one more new entry: id
					fetchedOrders.push({ ...res.data[key], id: key });
				}

				dispatch(fetchOrdersSuccess(fetchedOrders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err));
			});
	};
};
