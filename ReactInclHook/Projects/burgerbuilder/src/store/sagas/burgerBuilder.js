import axios from "../../axios-orders";
import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
export function* initIngredientsSaga(action) {
	// execute async code
	try {
		const response = yield axios.get(
			"https://react-burger-699a0.firebaseio.com/ingredients.json"
		);
		yield put(actions.setIngredients(response.data));
	} catch (err) {
		yield put(actions.fetchIngredientsFailed());
	}
}
