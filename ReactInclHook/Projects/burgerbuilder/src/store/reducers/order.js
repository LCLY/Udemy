import * as actionTypes from "../actions/actionTypes";
const initialState = {
	orders: [],
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			// forming a new object that can keep id and orderdata
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			// burger purchase successful then stop loading and add new data into the order state
			return {
				...state,
				loading: false,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.PURCHASE_BURGER_FAIL:
			return { ...state, loading: false };
		default:
			return state;
	}
};

export default reducer;
