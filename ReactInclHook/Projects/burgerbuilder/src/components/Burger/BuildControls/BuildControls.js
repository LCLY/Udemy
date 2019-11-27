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
			<p>
				Current Price: <strong>{props.price.toFixed(2)}</strong>
			</p>
			{controls.map(el => {
				return (
					<BuildControl
						key={el.label}
						label={el.label}
						// passing in the type to the function
						added={() => props.ingredientAdded(el.type)}
						removed={() => props.ingredientRemoved(el.type)}
						disabled={props.disabled[el.type]}
					/>
				);
			})}
			<button className={classes.OrderButton} disabled={!props.purchasable}>
				ORDER NOW
			</button>
		</div>
	);
};

export default BuildControls;
