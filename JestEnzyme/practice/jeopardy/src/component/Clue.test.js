import React from "react";
import { shallow } from "enzyme";
import Clue from "./Clue";
import { clue } from "../data/fixtures";
// first thing is to check whether the component needs a prop, if we need it
// then we need to create arbritary data to fill up the props
// in this case its fixture

const props = { clue };

describe("Clue", () => {
	const clueWrapper = shallow(<Clue {...props} />);
	it("renders the clue value", () => {
		// console.log(clueWrapper.debug());
		expect(clueWrapper.find("h4").text()).toEqual(clue.value.toString());
	});

	it("renders the clue question", () => {
		expect(
			clueWrapper
				.find("h5")
				.at(0)
				.text()
		).toEqual(clue.question);
	});

	it("renders the clue answer", () => {
		expect(
			clueWrapper
				.find("h5")
				.at(1)
				.text()
		).toEqual(clue.answer);
	});

	it("sets the answer with the `text-hidden` class", () => {
		// assuming that it will always start with the class text-hidden
		expect(
			clueWrapper
				.find("h5")
				.at(1)
				.hasClass("text-hidden")
		).toBe(true);
	});

	it("initializes the `reveal` state to be false", () => {
		expect(clueWrapper.state().reveal).toBe(false);
	});
});
