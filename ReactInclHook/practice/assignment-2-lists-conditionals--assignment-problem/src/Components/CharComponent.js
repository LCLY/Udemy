import React from "react";

const CharComponent = props => {
	// getting the text split the char and print them into a list with each char
	const style = {
		display: "inline-block",
		padding: "16px",
		textAlign: "center",
		margin: "16px",
		border: "1px solid black"
	};

	return (
		<div style={style} onClick={props.clicked}>
			{props.character}
		</div>
	);
};

export default CharComponent;
