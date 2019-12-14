import React from "react";
import { shallow } from "enzyme";
import { Stack } from "./Stack";
import { stack } from "../data/fixtures";
const props = { stack };

describe("Stack", () => {
	const stack = shallow(<Stack {...props} />);

	it("renders the title", () => {
		// console.log(stack.debug());
		expect(stack.find("h3").text()).toEqual(props.stack.title);
	});

	it("renders the Link home", () => {
		expect(stack.find("Link h4").text()).toEqual("Home");
	});

	// check if the number of cards rendered is the same as we expect
	it("renders the correct number of cards", () => {
		expect(stack.find("Card").length).toEqual(props.stack.cards.length);
	});
});
