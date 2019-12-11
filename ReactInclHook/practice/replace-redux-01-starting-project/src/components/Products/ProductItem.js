import React from "react";
// import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import "./ProductItem.css";
import { useStore } from "../../hooks-store/store";
// import { ProductsContext } from "../../context/products-context";
const ProductItem = React.memo(props => {
	//it will render 4 times here when we click button
	//because of the store that has useState
	console.log("RENDERING");
	// false is passed in to shouldListen so it wont trigger setState
	const dispatch = useStore(false)[1];
	// const toggleFav = useContext(ProductsContext).toggleFav;
	// const dispatch = useDispatch();

	const toggleFavHandler = () => {
		// dispatch(toggleFav(props.id));
		// toggleFav(props.id);
		dispatch("TOGGLE_FAV", props.id);
	};

	return (
		<Card style={{ marginBottom: "1rem" }}>
			<div className="product-item">
				<h2 className={props.isFav ? "is-fav" : ""}>{props.title}</h2>
				<p>{props.description}</p>
				<button
					className={!props.isFav ? "button-outline" : ""}
					onClick={toggleFavHandler}
				>
					{props.isFav ? "Un-Favorite" : "Favorite"}
				</button>
			</div>
		</Card>
	);
});

export default ProductItem;
