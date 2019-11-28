import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
// we need to import instead of using the link directly in the src
// because when we build, the asset folder will be in the
// built folder and the path will be different
import classes from "./Logo.module.css";
const Logo = props => {
	return (
		<div className={classes.Logo}>
			<img src={burgerLogo} alt="MyBurger"></img>
		</div>
	);
};

export default Logo;
