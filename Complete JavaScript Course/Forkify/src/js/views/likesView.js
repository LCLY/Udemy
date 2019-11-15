import { elements } from "./base";
export const toggleLikeBtn = isLiked => {
	const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
	//we are changing use which is the child of .recipe__love
	document
		.querySelector(".recipe__love use")
		.setAttribute("href", `img/icons.svg#${iconString}`);
};

// img/icons.svg#icon-heart-outlined
// img/icons.svg#icon-heart
