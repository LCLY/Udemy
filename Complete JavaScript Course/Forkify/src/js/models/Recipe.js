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
}
