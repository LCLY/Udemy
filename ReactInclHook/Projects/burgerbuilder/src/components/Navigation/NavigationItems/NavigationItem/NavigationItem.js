import React from "react";
import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
	return (
		<li className={classes.NavigationItem}>
			{/* if true, set the class to active or else nothing */}
			<a className={props.active ? classes.active : null} href={props.link}>
				{props.children}
			</a>
		</li>
	);
};

export default NavigationItem;
