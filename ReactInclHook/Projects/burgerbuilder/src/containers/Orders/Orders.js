import React, { Component } from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get("/orders.json")
			.then(res => {
				const fetchedOrders = [];
				for (let key in res.data) {
					// for every iteration, we add one more new entry: id
					fetchedOrders.push({ ...res.data[key], id: key });
				}
				// fetchedOrders from firebase is stored in the orders state
				this.setState({ loading: false, orders: fetchedOrders });
			})
			.catch(err => {
				this.setState({ loading: false });
			});
	}
	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={order.price}
					/>
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);
