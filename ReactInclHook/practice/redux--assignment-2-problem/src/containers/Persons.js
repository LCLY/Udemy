import React, { Component } from "react";

import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as actionTypes from "../store/actions";

// react-redux
import { connect } from "react-redux";
class Persons extends Component {
	state = {
		persons: []
	};

	personAddedHandler = () => {
		const newPerson = {
			id: Math.random(), // not really unique but good enough here!
			name: "Max",
			age: Math.floor(Math.random() * 40)
		};
		this.setState(prevState => {
			return { persons: prevState.persons.concat(newPerson) };
		});
	};

	personDeletedHandler = personId => {
		this.setState(prevState => {
			return {
				persons: prevState.persons.filter(person => person.id !== personId)
			};
		});
	};

	render() {
		return (
			<div>
				<AddPerson personAdded={this.props.onAddPersons} />
				{this.props.persons.map(person => (
					<Person
						key={person.id}
						name={person.name}
						age={person.age}
						clicked={() => this.props.onDeletePersons(person.id)}
					/>
				))}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		persons: state.personReducer.persons
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddPersons: () => dispatch({ type: actionTypes.ADD_PERSON }),
		// pass in id here
		onDeletePersons: id =>
			dispatch({ type: actionTypes.DELETE_PERSON, personId: id })
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Persons);
