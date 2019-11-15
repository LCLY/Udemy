import { elements } from "./base";
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = "";
};

//we need to clear the result before searching again or else it will stack
export const clearResults = () => {
	elements.searchResultList.innerHTML = "";
	elements.searchResPages.innerHTML = "";
};

export const highLightSelected = id => {
	const resultsArr = Array.from(document.querySelectorAll(".results__link"));
	resultsArr.forEach(el => {
		el.classList.remove("results__link--active");
	});
	document
		.querySelector(`.results__link[href="#${id}"]`)
		.classList.add("results__link--active");
};

// 'pasta with tomato and spinach'
// acc: 0 -> acc+cur.length = 0+5=5 (still <= 17) -> newTitle=['Pasta']
// acc: 5 -> acc+cur.length = 5+4=9 (still <= 17) -> newTitle=['Pasta','With']
// acc: 9 -> acc+cur.length = 9+6=15 (still <= 17) -> newTitle=['Pasta','With','Tomato]
// acc: 15 -> acc+cur.length = 15+3=18 (now > 17) -> newTitle=['Pasta','With','Tomato]
// acc: 18 -> acc+cur.length = 18+7=25 (now > 17) -> newTitle=['Pasta','With','Tomato]
const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = [];
	if (title.length > limit) {
		title.split(" ").reduce((acc, curr) => {
			if (acc + curr.length <= limit) {
				newTitle.push(curr);
			}
			return acc + curr.length;
		}, 0);
		// return the string that is within the limit
		return `${newTitle.join(" ")} ...`;
	}
	return title;
};

const renderRecipe = recipe => {
	const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(
											recipe.title
										)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
	elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// pass in number of page and to go forward or backward
// type: 'prev', 'next'
const createButton = (
	page,
	type
) => ` <button class="btn-inline results__btn--${type}"
		data-goto=${type === "prev" ? page - 1 : page + 1}>
		<span>Page ${type === "prev" ? page - 1 : page + 1}</span>
			<svg class="search__icon">
				<use href="img/icons.svg#icon-triangle-${
					type === "prev" ? "left" : "right"
				}"></use>
			</svg>		
		</button>
	`;

const renderButtons = (page, numResults, resPerPage) => {
	// if there are 30 results and we want 10 results per page
	// 30/10 -> 3 pages
	// but if there are 35 we would also get 3 since 35/10 -> 3
	// so we want to do Math.ceil to round up the 3.5 to 4 to get 4 pages
	const pages = Math.ceil(numResults / resPerPage);
	let button;
	if (page === 1 && pages > 1) {
		// only button to go to next page
		button = createButton(page, "next");
	} else if (page < pages) {
		// both buttons
		button = `${createButton(page, "prev")}${createButton(page, "next")}`;
	} else if (page === pages && pages > 1) {
		// only button to get prev page
		button = createButton(page, "prev");
	}
	elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
	// render results of current page
	// if there are 3 pages
	// start -> (1 - 1) * 10 -> 0
	// end -> 1 * 10
	// so we are copying from 0 - 9 which are 10 elements
	// next iteration
	// start -> (2 - 1) * 10 -> 10
	// end -> 2 * 10
	// now we are copying from 10 - 19 which are also 10 elements
	// so on and so forth
	const start = (page - 1) * resPerPage;
	const end = page * resPerPage;
	// slice will make a copy of array of recipes from 0 - 9
	recipes.slice(start, end).forEach(el => renderRecipe(el));

	// render pagination button
	renderButtons(page, recipes.length, resPerPage);
};
