import React from "react";
import { mount } from "enzyme";
import { Category } from "./Category";
import { categories } from "../data/fixtures";

// since category is only taking 1 element each time, so we are just getting the first element from the categories array
const props = { category: categories[0] };
describe("Category", () => {
	const category = mount(<Category {...props} />);
});
