import Search from "./models/Search";
// this is our main controller

/* global state of the app
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = "pizza"; //TODO

    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);
        // 3. prepare UI for results

        // 4. Search for recipes
        await state.search.getResults();

        // 5. render the results to ui
        console.log(state.search.result);
    }
};

document.querySelector(".search").addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});
