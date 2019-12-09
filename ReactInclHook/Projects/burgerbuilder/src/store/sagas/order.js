import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* purchaseBurgerSaga(action) {
	yield put(actions.purchaseBurgerStart());
	try {
		const res = yield axios.post(
			"/orders.json?auth=" + action.token,
			action.orderData
		);
		yield put(actions.purchaseBurgerSuccess(res.data.name, action.orderData));
	} catch (err) {
		yield put(actions.purchaseBurgerFail(err));
	}
}
export function* fetchOrdersSaga(action) {
	yield put(actions.fetchOrdersStart());
	// order the results with userid equal to userid, the syntax is provided by firebase
	const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
	try {
		const res = yield axios.get("/orders.json" + queryParams);
		const fetchedOrders = [];
		for (let key in res.data) {
			// for every iteration, we add one more new entry: id
			fetchedOrders.push({ ...res.data[key], id: key });
		}

		yield put(actions.fetchOrdersSuccess(fetchedOrders));
	} catch (err) {
		yield put(actions.fetchOrdersFail(err));
	}
}
