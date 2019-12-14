import React from "react";
import { mount, shallow } from "enzyme";
import { Category, LinkedCategory } from "./Category";
import { categories, clues } from "../data/fixtures";
import { fakeServer } from "sinon";

// since category is only taking 1 element each time, so we are just getting the first element from the categories array
const props = { category: categories[0] };
describe("Category", () => {
	let server;
	beforeEach(() => {
		// created a fake server
		server = fakeServer.create();
		// then we pass in the arguments that respondWith needs, we fill in with fake data
		server.respondWith(
			"GET",
			`http://jservice.io/api/clues?category=${props.category.id}`,
			[200, { "Content-Type": "application/json" }, JSON.stringify(clues)]
		);
	});
	// then we start mounting the category
	describe("when creating a new category", () => {
		let category;
		beforeEach(done => {
			category = mount(<Category {...props} />);
			server.respond();
			setTimeout(done); //we need this for async promise
			const servedClues = JSON.parse(server.responses[0].response[2]);
			category.setState({ clues: servedClues });
		});

		// it("logs the category", () => {
		// 	// console.log(category.debug());
		// });

		it("initializes the clues in state", () => {
			expect(category.state().clues).toEqual(clues);
		});
		it("renders the category title", () => {
			expect(category.find("h2").text()).toEqual(props.category.title);
		});
		it("renders the correct number of clues", () => {
			expect(category.find("Clue").length).toEqual(clues.length);
		});
	});
});

describe("LinkedCategory", () => {
	const linkedCategory = shallow(<LinkedCategory />);
	it("creates the link to navigate home", () => {
		expect(linkedCategory.find("Link h4").text()).toEqual("Home");
	});
	it("creates a category component", () => {
		expect(linkedCategory.find("Category").exists()).toBe(true);
	});
});
