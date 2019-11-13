// here is to store all the element's name
export const elements = {
	searchForm: document.querySelector(".search"),
	searchInput: document.querySelector(".search__field"),
	searchResultList: document.querySelector(".results__list"),
	searchRes: document.querySelector(".results")
};

export const elementStrings = {
	loader: "loader"
};

export const renderLoader = parent => {
	// we want to attach child loader to this parent element so that its reusable
	const loader = `
            <div class="${elementStrings.loader}">
                <svg>
                    <use href="img/icons.svg#icon-cw"></use>
                </svg>
            </div>
    `;
	parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementStrings.loader}`);
	if (loader) loader.parentElement.removeChild(loader);
};
