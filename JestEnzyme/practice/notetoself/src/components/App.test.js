import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("App", () => {
	let app = mount(<App />);
	// test whether or not we render a heading title
	it("renders the app title", () => {
		// console.log(app.debug());
		expect(app.find("h1").text()).toEqual("NOTE TO SELF");
	});

	it("renders the clear button", () => {
		expect(
			app
				.find(".btn")
				.at(1)
				.text()
		).toEqual("Clear Notes");
	});

	describe("when rendering the form", () => {
		it("creates a Form component", () => {
			// to make sure Form exist we find the form
			expect(app.find("Form").exists()).toBe(true);
		});
		it("renders a FormControl component", () => {
			// to make sure Form exist we find the form
			expect(app.find("FormControl").exists()).toBe(true);
		});
		it("renders a submit button", () => {
			// to make sure Form exist we find the form
			expect(
				app
					.find(".btn")
					.at(0)
					.text()
			).toEqual("Submit");
		});
	});
});
