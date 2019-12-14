import React, { Component } from "react";

class App extends Component {
	componentDidMount() {
		fetch("http://jservice.io/api/categories?count=20")
			.then(res => res.json())
			.then(json => console.log(json));
	}
	render() {
		return (
			<div>
				<h2>Jeopardy</h2>
			</div>
		);
	}
}

export default App;
