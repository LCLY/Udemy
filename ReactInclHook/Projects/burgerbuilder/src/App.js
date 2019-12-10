import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";

import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import * as actions from "./store/actions/index";
// import asyncComponent from "./hoc/asyncComponent/asyncComponent";

/* ========== Old way of doing lazy loading ========== */
// const asyncCheckout = asyncComponent(() => {
// 	// this function will eventually return this import statementa s a function
// 	// where we then can define the path to the component we want to load lazily
// 	return import("./containers/Checkout/Checkout");
// });
// const asyncOrders = asyncComponent(() => {
// 	return import("./containers/Orders/Orders");
// });
// const asyncAuth = asyncComponent(() => {
// 	return import("./containers/Auth/Auth");
// });

/* ========== New way of doing lazy loading ========== */
// now we dont even need the hoc asyncomponent anymore
const Checkout = React.lazy(() => {
	// this function will eventually return this import statementa s a function
	// where we then can define the path to the component we want to load lazily
	return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
	return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
	return import("./containers/Auth/Auth");
});

const App = props => {
	/* ========== class ========== */
	// componentDidMount() {
	// 	this.props.onTryAutoSignup();
	// }
	/* ========== functional ========== */
	const { onTryAutoSignup } = props;
	useEffect(() => {
		onTryAutoSignup();
	}, [onTryAutoSignup]);

	let routes = (
		// user that is not authenticated can only use these routes
		<Switch>
			<Route path="/auth" render={props => <Auth {...props} />} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (props.isAuthenticated) {
		// user that is authenticated can only use these routes
		routes = (
			<Switch>
				<Route path="/checkout" render={props => <Checkout {...props} />} />
				<Route path="/orders" render={props => <Orders {...props} />} />
				<Route path="/logout" component={Logout} />
				<Route path="/auth" render={props => <Auth {...props} />} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	}
	return (
		<div>
			<Layout>
				<Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	};
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
