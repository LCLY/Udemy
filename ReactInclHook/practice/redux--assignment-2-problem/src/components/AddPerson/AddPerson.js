import React, { Component } from "react";

import "./AddPerson.css";

class AddPerson extends Component {
	state = {
		name: "",
		age: ""
	};

	nameChangedHandler = e => {
		this.setState({ name: e.target.value });
	};

	ageChangedHandler = e => {
		this.setState({ age: e.target.value });
	};
	render() {
		return (
			<div className="AddPerson">
				<input
					type="text"
					placeholder="Name"
					onChange={this.nameChangedHandler}
					value={this.state.name}
				></input>
				<input
					type="number"
					placeholder="Age"
					onChange={this.ageChangedHandler}
					value={this.state.age}
				></input>
				<button
					onClick={() =>
						this.props.personAdded(this.state.name, this.state.age)
					}
				>
					Add Person
				</button>
			</div>
		);
	}
}

export default AddPerson;
