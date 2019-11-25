import React, { useState } from "react";

const Validation = props => {
	let message = "Text long enough";

	if (props.inputLength <= 5) {
		message = "Text too short";
	}
	return <div>{message}</div>;
};

export default Validation;
