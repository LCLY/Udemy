// a02b8f517e883ea228a8efb53df77e90
// url: https://www.food2fork.com/api/search
import { key, proxy } from "../config";
import axios from "axios";
export default class Search {
	constructor(query) {
		this.query = query;
	}

	// `${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`
	// used to look like this but now we are using the api provided by instructor so dont need
	// key and proxy anymore
	async getResults() {
		// to get the promise using axios
		try {
			const res = await axios(
				`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`
			);
			this.result = res.data.recipes;
			console.log(this.result);
		} catch (err) {
			alert(
				"You can only search for the terms PIZZA, BACON and BROCCOLI due to old API being closed down"
			);
		}
	}
}
