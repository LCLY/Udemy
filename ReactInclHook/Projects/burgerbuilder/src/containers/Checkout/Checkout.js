import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/order";
class Checkout extends Component {
	// this might cause a problem because we might still be using old props
	// componentWillMount() {
	// 	this.props.onInitPurchase();
	// }

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};
	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};

	render() {
		// set default redirect to home page,
		// only when ingredient exists then render the whole thing
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						onCheckoutCancelled={this.checkoutCancelledHandler}
						onCheckoutContinued={this.checkoutContinuedHandler}
					/>
					<Route
						path={this.props.match.path + "/contact-data"}
						component={ContactData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
