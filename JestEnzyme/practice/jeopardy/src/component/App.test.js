import React from "react";
import { shallow } from "enzyme";
import { App } from "./App";
import { categories } from "../data/fixtures";

const props = { categories };
// since theres a
describe("App", () => {
	// rmb to pass the props in
	const app = shallow(<App {...props} />);
	it("renders the title", () => {
		expect(app.find("h2").text()).toEqual("Jeopardy");
	});

	it("creates the correct number of Links", () => {
		expect(app.find("Link").length).toEqual(props.categories.length);
	});

	it("title the links correctly", () => {
		app.find("Link h4").forEach((linkTitle, index) => {
			// getting the text of title
			// comparing to categories title accessed with index
			// since we already pass the props into the shallowed component
			// so it should returned true
			expect(linkTitle.text()).toEqual(categories[index].title);
		});
	});
});
