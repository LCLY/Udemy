import React from "react";
import PropTypes from "prop-types";

const DrawerToggle = props => {
	return <div onClick={props.clicked}>MENU</div>;
};

DrawerToggle.propTypes = {
	clicked: PropTypes.func
};

export default DrawerToggle;
