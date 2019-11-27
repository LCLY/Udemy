import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const Burger = props => {
	// console.log(props.ingredients);
	let transformedIngredients = Object.keys(props.ingredients)
		.map(ingKey => {
			// console.log("ingredients:", props.ingredients);
			// console.log("array:", [...Array(props.ingredients[ingKey])]);

			// we are creating new arrays here with the Array func
			// we are retrieving the number that is stored in the ingredient key
			// with that, we are creating new Arrays with the length of that number, and
			// within that new array we render burgerIngredient
			return [...Array(props.ingredients[ingKey])].map((_, i) => {
				return (
					<BurgerIngredient key={ingKey + i} type={ingKey}></BurgerIngredient>
				);
			});
			// we want to check if theres ingredient or not, one way is to use reduce
			// we dont check the ingredients one by one, we can just compressed them
			// into a single array with all the elements, if theres nothing, it will just be 0
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients</p>;
	}

	// console.log("transformed:", transformedIngredients);
	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top" />
			{transformedIngredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default Burger;
