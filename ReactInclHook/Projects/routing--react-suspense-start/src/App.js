import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

// if we import like this it will always rendered in advance
// import Posts from "./containers/Posts";
import User from "./containers/User";
import Welcome from "./containers/Welcome";

const Posts = React.lazy(() => import("./containers/Posts"));

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<nav>
						<NavLink to="/user">User Page</NavLink> |&nbsp;
						<NavLink to="/posts">Posts Page</NavLink>
					</nav>
					<Route path="/" component={Welcome} exact />
					<Route path="/user" component={User} />
					<Route
						path="/posts"
						render={() => (
							// this fallback is when waiting for post to load
							<Suspense fallback={<div>loading...</div>}>
								<Posts />
							</Suspense>
						)}
					/>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
