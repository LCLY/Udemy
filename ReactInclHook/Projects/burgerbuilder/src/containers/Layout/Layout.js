import React, { useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
// turn this into a stateful component to handle backdrop
const Layout = props => {
	const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
	// state = {
	// 	showSideDrawer: false
	// };

	const sideDrawerClosedHandler = () => {
		/* ========== class ========== */
		// this.setState({ showSideDrawer: false });
		/* ========== functional ========== */
		setSideDrawerIsVisible(false);
	};

	const sideDrawerOpenHandler = () => {
		/* ========== class ========== */
		// this.setState(prevState => {
		// 	return { showSideDrawer: !prevState.showSideDrawer };
		// });
		/* ========== functional ========== */
		setSideDrawerIsVisible(!sideDrawerIsVisible);
	};

	return (
		<>
			<Toolbar
				isAuth={props.isAuthenticated}
				drawerToggleClicked={sideDrawerOpenHandler}
			/>
			<SideDrawer
				isAuth={props.isAuthenticated}
				open={sideDrawerIsVisible}
				closed={sideDrawerClosedHandler}
			/>
			<main className={classes.Content}>{props.children}</main>
		</>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null //if not null then return true
	};
};

export default connect(mapStateToProps)(Layout);
