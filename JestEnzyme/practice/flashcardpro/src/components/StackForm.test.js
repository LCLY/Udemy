import React from "react";
import { shallow } from "enzyme";
import { StackForm } from "./StackForm";
import { stack } from "../data/fixtures";
describe("StackForm", () => {
	const stackForm = shallow(<StackForm />);

	it("renders the form title", () => {
		expect(
			stackForm
				.find("h4")
				.at(1)
				.text()
		).toEqual("Create a New Stack");
	});

	it("renders a link home", () => {
		expect(
			stackForm
				.find("h4")
				.at(0)
				.text()
		).toEqual("Home");
	});

	it("renders a Form component", () => {
		expect(stackForm.find("Form").exists()).toBe(true);
	});

	it("renders a button to add a new card", () => {
		// console.log(stackForm.debug());
		expect(
			stackForm
				.find("Button")
				.at(0)
				.props().children
		).toEqual("Add Card");
	});
	it("renders a button to submit a form", () => {
		// console.log(stackForm.debug());
		expect(
			stackForm
				.find("Button")
				.at(1)
				.props().children
		).toEqual("Save and Add the stack");
	});

	describe("and updating the title", () => {
		beforeEach(() => {
			// here we are giving it an arbritary string to simulate we typed something
			// this will be stored as {title: 'change title', cards:[]}
			stackForm
				.find("FormControl")
				.simulate("change", { target: { value: "change title" } });
		});

		it("updates the title in the state", () => {
			// console.log(stackForm.state());
			expect(stackForm.state().title).toEqual("change title");
		});
	});

	describe("when adding a new card", () => {
		beforeEach(() => {
			stackForm
				.find("Button")
				.at(0)
				.simulate("click");
		});

		afterEach(() => {
			stackForm.setState({ cards: [] });
		});

		it("adds a new card to the state", () => {
			// toEqual 1 because technically here the state is empty, and when we click the button it will add 1 to it,
			// so the length should indeed be 1
			expect(stackForm.state().cards.length).toEqual(1);
		});

		it("renders the prompt section", () => {
			expect(
				stackForm
					.find("FormLabel")
					.at(1)
					.props().children
			).toEqual("Prompt:");
		});

		it("renders the answer section", () => {
			expect(
				stackForm
					.find("FormLabel")
					.at(2)
					.props().children
			).toEqual("Answer:");
		});

		describe("and updating the card prompt", () => {
			beforeEach(() => {
				stackForm
					.find("FormControl")
					.at(1)
					.simulate("change", { target: { value: "change prompt" } });
			});
			it("updates the prompt in the state", () => {
				// here it will show 4 cards because of the previous click add card action, since
				// there are 4 "its" including this one, it runs the click action 4 times.
				// to fix this issue, we need to clear the state in afterEach()
				// console.log(stackForm.state());
				expect(stackForm.state().cards[0].prompt).toEqual("change prompt");
			});
		});

		describe("and updating the card answer", () => {
			beforeEach(() => {
				stackForm
					.find("FormControl")
					.at(2)
					.simulate("change", { target: { value: "change answer" } });
			});

			it("updates the answer in the state", () => {
				expect(stackForm.state().cards[0].answer).toEqual("change answer");
			});
		});
	});
});
