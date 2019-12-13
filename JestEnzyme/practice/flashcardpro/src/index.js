import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Stack from "./components/Stack";
import StackForm from "./components/StackForm";
import { setStack } from "./actions";
import { Provider } from "react-redux";
import "./index.css";

const store = createStore(rootReducer);
store.subscribe(() => console.log("store", store.getState()));
store.dispatch(setStack({ id: 0, title: "example", cards: [] }));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/stack" component={Stack} />
				<Route path="/stack_form" component={StackForm} />
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
