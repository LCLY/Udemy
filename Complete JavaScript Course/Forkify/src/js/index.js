import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

// this is our main controller

/* global state of the app
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
// just an object to store the state
const state = {};

/* ==========  SEARCH CONTROLLER ========== */
const controlSearch = async () => {
	// 1. get query from view
	const query = searchView.getInput(); //TODO

	if (query) {
		// 2. new search object and add to state
		state.search = new Search(query);
		// 3. prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);
		// 4. Search for recipes
		await state.search.getResults();

		// 5. render the results to ui
		clearLoader();
		// console.log(state.search.result);
		searchView.renderResults(state.search.result);
	}
};

elements.searchForm.addEventListener("submit", e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener("click", e => {
	const btn = e.target.closest(".btn-inline");
	// console.log(btn);
	if (btn) {
		// the 10 is base 10
		// console.log("goto: ", btn.dataset.goto);
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
		// console.log(goToPage);
	}
});

/* ========== RECIPE CONTROLLER ========== */
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
