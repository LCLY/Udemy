import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class Category extends Component {
	componentDidMount() {
		console.log(this.props.category);
	}

	render() {
		return (
			<div>
				<Link className="link-home" to="/">
					<h4>Home</h4>
				</Link>
				<h2>Category title</h2>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { category: state.categoryReducer };
};

export default connect(mapStateToProps)(Category);
