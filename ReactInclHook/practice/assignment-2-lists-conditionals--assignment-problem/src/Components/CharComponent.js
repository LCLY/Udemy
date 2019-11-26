import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
const CharComponent = props => {
	const toggleListRef = useRef(null);

	useEffect(() => {
		console.log("render only the first time");
		console.log("toggle Ref:", toggleListRef);
		// toggleListRef.current.innerHTML = "<div></div>";
		return () => {
			console.log("cleaning up just like componentWillUnmount");
		};
	}, []);

	useEffect(() => {
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
			<button ref={toggleListRef}>TEST</button>
		</div>
	);
};

CharComponent.propTypes = {
	clicked: PropTypes.func,
	character: PropTypes.string
};

export default CharComponent;
