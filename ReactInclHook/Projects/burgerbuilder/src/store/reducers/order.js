import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			// return { ...state, purchased: false };
			// change to
			return updateObject(state, { purchased: false });

		case actionTypes.PURCHASE_BURGER_START:
			// return {
			// 	...state,
			// 	loading: true
			// };
			// change to
			return updateObject(state, { loading: true });

		case actionTypes.PURCHASE_BURGER_SUCCESS:
			// forming a new object that can keep id and orderdata
			/*const newOrder = {
				...action.orderData,
				id: action.orderId
			};*/

			const newOrder = updateObject(action.orderData, { id: action.orderId });

			// burger purchase successful then stop loading and add new data into the order state
			/*return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			};*/
			// change to

			return updateObject(state, {
				loading: false,
				orders: state.orders.concat(newOrder),
				purchased: true
			});
		case actionTypes.PURCHASE_BURGER_FAIL:
			// return { ...state, loading: false };
			return updateObject(state, { loading: false });
		case actionTypes.FETCH_ORDERS_START:
			// return { ...state, loading: true };
			return updateObject(state, { loading: true });
		case actionTypes.FETCH_ORDERS_SUCCESS:
			// return { ...state, orders: action.orders, loading: false };
			return updateObject(state, { orders: action.orders, loading: false });
		case actionTypes.FETCH_ORDERS_FAIL:
			// return { ...state, loading: false };
			return updateObject(state, { loading: false });
		default:
			return state;
	}
};

export default reducer;
