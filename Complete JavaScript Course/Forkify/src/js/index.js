import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
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
	// testing
	// const query = "pizza";
	if (query) {
		// 2. new search object and add to state
		state.search = new Search(query);
		// 3. prepare UI for results
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchRes);
		try {
			// 4. Search for recipes
			await state.search.getResults();

			// 5. render the results to ui
			clearLoader();
			// console.log(state.search.result);
			searchView.renderResults(state.search.result);
		} catch (err) {
			clearLoader();
			alert(err);
		}
	}
};

elements.searchForm.addEventListener("submit", e => {
	e.preventDefault();
	controlSearch();
});

// window.addEventListener("load", e => {
// 	e.preventDefault();
// 	controlSearch();
// });
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
// const r = new Recipe(46956);
// r.getRecipe();
// console.log(r);
const controlRecipe = async () => {
	// window.location is the entire url
	// Get ID from url
	const id = window.location.hash.replace("#", "");
	console.log(id);
	if (id) {
		// prepare UI for changes
		recipeView.clearRecipe();

		// always remember we need to put in the parent for it to refer
		renderLoader(elements.recipe);

		//Highlight selected search item
		if (state.search) searchView.highLightSelected(id);

		// create new recipe obejct
		state.recipe = new Recipe(id);

		// TESTING - expose the object
		// window.r = state.recipe;
		// get recipe data
		try {
			// without the try catch block, we are assuming the promise will always resolve
			await state.recipe.getRecipe();
			// console.log(state.recipe.ingredients);
			// parse ingredients
			state.recipe.parseIngredients();
			// calc servings and time
			state.recipe.calcTime();
			state.recipe.calcServings();

			// render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe);
			// console.log(state.recipe);
		} catch (err) {
			alert(err);
		}
	}
};

// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);
["hashchange", "load"].forEach(event =>
	window.addEventListener(event, controlRecipe)
);

// event delegation for the serving changing buttons because they are still nt there when we load the page

elements.recipe.addEventListener("click", e => {
	// in this case we cant use closest() like before because there are more than one elements
	// that we are going to click, closest cant specify
	// by using matches, we can match the class we want
	// the asterisk is any child element of btn-decrease
	if (e.target.matches(".btn-decrease, .btn-decrease *")) {
		// decrease button is clicked
		if (state.recipe.servings > 1) {
			state.recipe.updateServings("dec");
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches(".btn-increase, .btn-increase *")) {
		state.recipe.updateServings("inc");
		recipeView.updateServingsIngredients(state.recipe);
	}

	console.log(state.recipe);
});
