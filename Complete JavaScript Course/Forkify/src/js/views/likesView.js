import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";
export const toggleLikeBtn = isLiked => {
	const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
	//we are changing use which is the child of .recipe__love
	document
		.querySelector(".recipe__love use")
		.setAttribute("href", `img/icons.svg#${iconString}`);
};
export const toggleLikeMenu = numLikes => {
	// if theres actually liked recipe, display them else hide them
	elements.likesMenu.style.visibility = numLikes > 0 ? "visible" : "hidden";
};

export const renderLike = like => {
	console.log(like);
	const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="${like.img}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="likes__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
	elements.likesList.insertAdjacentHTML("beforeend", markup);
};

export const deleteLike = id => {
	const el = document.querySelector(`.likes__link[href*="${id}"]`)
		.parentElement;
	if (el) el.parentElement.removeChild(el);
};
