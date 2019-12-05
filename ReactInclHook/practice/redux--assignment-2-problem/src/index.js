import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// react-redux
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import personReducer from "./store/reducers/person";

const rootReducer = combineReducers({ personReducer: personReducer });
const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
registerServiceWorker();
