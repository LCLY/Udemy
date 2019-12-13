import React, { Component } from "react";
import { Link } from "react-router-dom";
class Stack extends Component {
	render() {
		return (
			<div>
				<Link to="/">Home</Link>
				<h3>Example title</h3>
			</div>
		);
	}
}

export default Stack;
