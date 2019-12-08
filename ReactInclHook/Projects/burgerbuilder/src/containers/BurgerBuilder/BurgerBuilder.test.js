import React from "react";
import { BurgerBuilder } from "./BurgerBuilder";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
	let wrapper;
	beforeEach(() => {
		// apparently we need to call the onInitIngredients props and pass it as
		// an anonymous function since this function is only called after the
		// component is rendered, so its too late already to be able to fetch
		// the instantiated ingredients
		wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} />);
	});
	// check burgerbuilder exists when there is ingredient
	it("should render <BuildControls /> when receiving ingredients", () => {
		wrapper.setProps({ ings: { salad: 0 } });
		// should have 1 buildcontrols
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
