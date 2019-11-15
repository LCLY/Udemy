import axios from "axios";
import { key, proxy } from "../config";

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			// try to get the AJAX promise
			const res = await axios(
				`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
			);
			// create a new object
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.image = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
			console.log(res);
		} catch (err) {
			console.log(err);
			alert("Something went wrong!");
		}
	}

	calcTime() {
		// Assuming that we need 15 mins for each ingredient
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}
	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = [
			"tablespoons",
			"tablespoon",
			"ounces",
			"ounce",
			"teaspoons",
			"teaspoon",
			"cups",
			"pounds"
		];
		const unitsShort = [
			"tbsp",
			"tbsp",
			"oz",
			"oz",
			"tsp",
			"tsp",
			"cup",
			"pound"
		];
		const units = [...unitsShort, "kg", "g"];
		// for each ingredient element
		const newIngredients = this.ingredients.map(el => {
			// 1. uniform units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, i) => {
				// unit is the current value, i is index
				// for every ingredient replace the unit with the shorter unit
				// they will be replace by the unitShort that has the same position as unitLong
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});
			// 2. remove parenthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

			// 3. parse ingredients into count, unit and ingredient
			const arrIng = ingredient.split(" ");
			// it will return true if the element is inside the array
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

			let objIng;
			if (unitIndex > -1) {
				// there is a unit
				//Ex. 4 1/2 cups, arrCount is [4, 1/2]
				//Ex. 4 cups, arrCount is [4]
				const arrCount = arrIng.slice(0, unitIndex);
				let count;
				if (arrCount.length === 1) {
					//if theres only 1 number before the unit then that number is the count itself
					// also in the data, some unit is repesented as 1-1/2 which means 1 and a half
					// so we replace - with + and eval to return a whole number
					count = eval(arrIng[0].replace("-", "+"));
				} else {
					// using the example above, it will return "4+1/2"
					// with eval("4+1/2") --> 4.5
					count = eval(arrIng.slice(0, unitIndex).join("+"));
				}

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(" ")
				};
			} else if (parseInt(arrIng[0], 10)) {
				// There is no unit but 1st element is a number
				// slice(1) -> is to start copying the array after the first element
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: "",
					ingredient: arrIng.slice(1).join(" ")
				};
			} else if (unitIndex === -1) {
				// there is no unit and no number in first position
				// ES6 -> instead of ingredient: ingredient just do ingredient
				objIng = {
					count: 1,
					unit: "",
					ingredient
				};
			}

			return objIng; //each iteration we need to return to be saved to the current position of the new array
		});
		this.ingredients = newIngredients;
	}
}
