import React from "react";

import classes from "./Person.css";

const Person = props => {
	// const rnd = Math.random();

	// if (rnd > 0.7) {
	// 	throw new Error("OOOOOPS something went wrong");
	// }
	console.log("person.js render");
	return (
		<div className={classes.Person}>
			<p onClick={props.click}>
				I'm {props.name} and I am {props.age} years old!
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</div>
	);
};

export default Person;
