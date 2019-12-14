import React from "react";
import ReactDOM from "react-dom";
import App from "./component/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Category from "./component/Category";
import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/category" component={Category} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
