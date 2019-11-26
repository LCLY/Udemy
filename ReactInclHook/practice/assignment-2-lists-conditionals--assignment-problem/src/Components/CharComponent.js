import React, { useEffect } from "react";

const CharComponent = props => {
	useEffect(() => {
		console.log("render only the first time");
		return () => {
			console.log("cleaning up just like componentWillUnmount");
		};
	}, []);

	useEffect(() => {
		console.log("render only the first time");
		return () => {
			console.log("Second cleaning up");
		};
	});

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
