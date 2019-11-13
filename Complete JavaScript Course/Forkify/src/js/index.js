import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";
// this is our main controller

/* global state of the app
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
// just an object to store the state
const state = {};

const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput(); //TODO

	if (query) {
		// 2. new search object and add to state
		state.search = new Search(query);
		// 3. prepare UI for results

		// 4. Search for recipes
		await state.search.getResults();

		// 5. render the results to ui
		// console.log(state.search.result);
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener("submit", e => {
	e.preventDefault();
	controlSearch();
});
