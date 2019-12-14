import React, { Component } from "react";
import { connect } from "react-redux";
import { setCategories } from "../actions";

class App extends Component {
	componentDidMount() {
		if (this.props.categories.length === 0) {
			// only fetch when nothing exists
			fetch("http://jservice.io/api/categories?count=20")
				.then(res => res.json())
				.then(json => this.props.setCategories(json));
		}
	}
	render() {
		return (
			<div>
				<h2>Jeopardy</h2>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { categories: state };
};

export default connect(mapStateToProps, { setCategories })(App);
