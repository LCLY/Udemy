import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
// import * as actions from "../../store/actions/order";
const Checkout = props => {
	// this might cause a problem because we might still be using old props
	// componentWillMount() {
	// 	this.props.onInitPurchase();
	// }

	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};
	const checkoutContinuedHandler = () => {
		props.history.replace("/checkout/contact-data");
	};

	// set default redirect to home page,
	// only when ingredient exists then render the whole thing
	let summary = <Redirect to="/" />;
	if (props.ings) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<div>
				{purchasedRedirect}
				<CheckoutSummary
					ingredients={props.ings}
					onCheckoutCancelled={checkoutCancelledHandler}
					onCheckoutContinued={checkoutContinuedHandler}
				/>
				<Route
					path={props.match.path + "/contact-data"}
					component={ContactData}
				/>
			</div>
		);
	}
	return summary;
};

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(Checkout);
