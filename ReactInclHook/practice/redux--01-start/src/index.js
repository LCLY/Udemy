import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const rootReducer = combineReducers({
	ctr: counterReducer,
	res: resultReducer
});

const logger = store => {
	// next is the middleware
	return next => {
		return action => {
			console.log("[Middleware] Dispatching", action);
			const result = next(action); //let action continue to reducer
			console.log("[Middeware] next state", store.getState());
			return result;
		};
	};
};

// this is for chrome to recognize the tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 2nd argument can add middleware
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
