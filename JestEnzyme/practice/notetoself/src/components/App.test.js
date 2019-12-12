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

	describe("when creating a note", () => {
		let testNote = "test note";
		beforeEach(() => {
			// ady check if it exist so dont have to check again
			// simulate takes in the event
			app.find("FormControl").simulate("change", {
				target: { value: testNote }
			});
		});

		// test for text state update
		it("updates the text in state", () => {
			expect(app.state().text).toEqual(testNote);
		});

		// nested describe block
		describe("and submitting the new note", () => {
			beforeEach(() => {
				// click the submit button
				app
					.find(".btn")
					.at(0)
					.simulate("click");
			});

			afterEach(() => {
				// click the clear button
				app
					.find(".btn")
					.at(1)
					.simulate("click");
			});

			it("adds the new note to state", () => {
				// console.log(app.state());
				expect(app.state().notes[0].text).toEqual(testNote);
			});

			describe("and remounting the component", () => {
				let app2;
				beforeEach(() => {
					app2 = mount(<App />);
				});

				it("reads the stored note cookies", () => {
					// if we dont do this
					// console.log(app2.state());
					/*afterEach(() => {           
            app
              .find(".btn")
              .at(1)
              .simulate("click");
          });*/
					// we will get this result from console.log:
					// { text: '', notes: [ { text: 'test note' }, { text: 'test note' } ] }
					// this is not we want for the state of a remounted component in this situation
					expect(app2.state().notes).toEqual([{ text: "test note" }]);
				});
			});

			// if user clicks the clear button
			describe("and clicking the clear button", () => {
				beforeEach(() => {
					app
						.find(".btn")
						.at(1)
						.simulate("click");
				});
				it("clears the notes in the state", () => {
					expect(app.state().notes).toEqual([]);
				});
			});
		});
	});
});
