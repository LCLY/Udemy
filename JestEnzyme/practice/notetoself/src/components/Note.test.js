import React from "react";
// allows us to mimic the mounting behavior of this component onto the actual dom
import { mount } from "enzyme";
import Note from "./Note";

const props = { note: { text: "test note" } };

console.log({ ...props });

// 1st argument is description of the test, 2nd argument if function
describe("Note", () => {
	// there will be an undefined error if we dont pass in the prop
	let note = mount(<Note {...props} />);

	// "it" takes string as 1st parameter which describes what we are testing
	it("renders the note test", () => {
		// console.log(note.debug());
		// compare strings or variables
		// find p is to find the paragraph tag
		expect(note.find("p").text()).toEqual(props.note.text);
	});
});

// spread operator
// testing spread on array
// const triplePrint = (a, b, c) => {
// 	console.log(`${a} ${b} ${c}`);
// };

// const message = ["react", "is", "awesome"];

// old way of getting the array
// triplePrint(message[0], message[1], message[2]);

// ES6 way of getting array
// triplePrint(...message);
