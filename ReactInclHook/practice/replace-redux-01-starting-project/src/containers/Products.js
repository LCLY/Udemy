import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { useStore } from "../hooks-store/store";
import ProductItem from "../components/Products/ProductItem";
import { ProductsContext } from "../context/products-context";
import "./Products.css";

const Products = props => {
	// [0] is state
	const state = useStore()[0];
	const productList = useContext(ProductsContext).products;
	return (
		<ul className="products-list">
			{state.products.map(prod => (
				<ProductItem
					key={prod.id}
					id={prod.id}
					title={prod.title}
					description={prod.description}
					isFav={prod.isFavorite}
				/>
			))}
		</ul>
	);
};

export default Products;
