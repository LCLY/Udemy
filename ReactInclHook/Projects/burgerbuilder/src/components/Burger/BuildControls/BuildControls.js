import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const BuildControls = props => {
	const controls = [
		{ label: "Salad", type: "salad" },
		{ label: "Bacon", type: "bacon" },
		{ label: "Cheese", type: "cheese" },
		{ label: "Meat", type: "meat" }
	];
	return (
		<div className={classes.BuildControls}>
			{controls.map(el => {
				return (
					<BuildControl
						key={el.label}
						label={el.label}
						// passing in the type to the function
						added={() => props.ingredientAdded(el.type)}
					/>
				);
			})}
		</div>
	);
};

export default BuildControls;
