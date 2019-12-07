import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = props => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem exact link="/">
				Burger Builder
			</NavigationItem>
			{/* hide orders if not authenticated */}
			{props.isAuthenticated ? (
				<NavigationItem link="/orders">Orders</NavigationItem>
			) : null}
			{props.isAuthenticated ? (
				<NavigationItem link="/logout">Logout</NavigationItem>
			) : (
				<NavigationItem link="/auth">Login</NavigationItem>
			)}
		</ul>
	);
};

export default NavigationItems;
