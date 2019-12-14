import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Clue from "./Clue";
export class Category extends Component {
	state = {
		clues: []
	};
	componentDidMount() {
		fetch(`http://jservice.io/api/clues?category=${this.props.category.id}`)
			.then(res => res.json())
			.then(json => this.setState({ clues: json }));
	}

	render() {
		return (
			<div>
				<h2>{this.props.category.title}</h2>
				{this.state.clues.map(clue => {
					return (
						<Clue key={clue.id} clue={clue}>
							{clue.question}
						</Clue>
					);
				})}
			</div>
		);
	}
}
export class LinkedCategory extends Component {
	render() {
		return (
			<div>
				<Link className="link-home" to="/">
					<h4>Home</h4>
				</Link>
				<Category category={this.props.category} />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return { category: state.categoryReducer };
};

export default connect(mapStateToProps)(LinkedCategory);
