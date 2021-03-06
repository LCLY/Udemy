import React from "react";
import Person from "./Person/Person";
const Persons = props => {
	console.log("persons.js rendering");
	const result = props.persons.map((person, index) => {
		return (
			<Person
				click={() => props.clicked(index)}
				name={person.name}
				age={person.age}
				changed={event => props.changed(event, person.id)}
			/>
		);
	});
	return <div>{result}</div>;
};

export default Persons;
