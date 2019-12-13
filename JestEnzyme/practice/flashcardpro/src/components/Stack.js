import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Card from "./Card";
class Stack extends Component {
	render() {
		const { title, cards } = this.props.stack;
		return (
			<div>
				<Link className="link-home" to="/">
					<h4>Home</h4>
				</Link>
				<h3>{title}</h3>
				<br />
				{cards.map(card => {
					return <Card key={card.id} card={card} />;
				})}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { stack: state };
};

export default connect(mapStateToProps, null)(Stack);
