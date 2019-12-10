import React, { useEffect } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/order";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
const Orders = props => {
	/* ========== Class ========== */
	// componentDidMount() {
	// 	this.props.onFetchOrders(this.props.token, this.props.userId);
	// }
	/* ========== Functional ========== */
	const { token, userId, onFetchOrders } = props;
	useEffect(() => {
		onFetchOrders(token, userId);
	}, [token, userId, onFetchOrders]);

	let orders = <Spinner />;
	if (!props.loading) {
		orders = props.orders.map(order => (
			<Order
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}
			/>
		));
	}
	return <div>{orders}</div>;
};

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: (token, userId) =>
			dispatch(actions.fetchOrders(token, userId))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(Orders, axios));
