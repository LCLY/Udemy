import React, { Component } from "react";
import "./Blog.css";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";
import { Switch, Route, NavLink } from "react-router-dom";
class Blog extends Component {
	render() {
		return (
			<div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
									exact
									to="/"
									activeClassName="my-active"
									activeStyle={{
										color: "#fa923f",
										textDecoration: "underline"
									}}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={{
										pathname: "/new-post",
										hash: "#submit",
										search: "?quick-submit=true"
									}}
								>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<Route path="/" exact component={Posts} />
				<Switch>
					<Route path="/new-post" exact component={NewPost} />
					<Route path="/:id" exact component={FullPost} />
				</Switch>
			</div>
		);
	}
}

export default Blog;
