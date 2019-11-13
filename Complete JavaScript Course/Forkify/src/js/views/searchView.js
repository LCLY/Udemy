import { elements } from "./base";
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = "";
};

//we need to clear the result before searching again or else it will stack
export const clearResults = () => {
	elements.searchResultList.innerHTML = "";
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

export const renderResults = recipes => {
	recipes.forEach(el => renderRecipe(el));
};
