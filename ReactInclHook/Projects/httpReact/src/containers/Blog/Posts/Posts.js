import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios";
import FullPost from "../../../containers/Blog/FullPost/FullPost";
import { Route } from "react-router-dom";
import "./Posts.css";

class Posts extends Component {
	state = {
		posts: [],

		error: false,
		loading: true
	};

	componentDidMount() {
		// console.log(this.props.match);
		axios
			.get("/posts")
			.then(response => {
				this.setState({ loading: false });
				const posts = response.data.slice(0, 4);
				const updatedPosts = posts.map(post => {
					return {
						...post,
						author: "Max"
					};
				});

				this.setState({ posts: updatedPosts });
			})
			.catch(err => {
				this.setState({ error: true });
			});
	}

	postSelectedhandler = id => {
		this.props.history.push("/posts/" + id);
	};
	render() {
		let posts = <p style={{ textAlign: "center" }}> Something went wrong</p>;
		if (!this.state.error) {
			posts = this.state.posts.map(post => {
				// console.log(post.title);
				return (
					// <Link to={"/" + post.id} >
					<Post
						key={post.id}
						title={post.title}
						author={post.author}
						clicked={() => this.postSelectedhandler(post.id)}
					/>
					// </Link>
				);
			});
		}
		return (
			<>
				{this.state.loading ? (
					<Spinner />
				) : (
					<div>
						<section className="Posts">{posts}</section>
						<Route
							path={this.props.match.url + "/:id"}
							exact
							component={FullPost}
						/>
					</div>
				)}
			</>
		);
	}
}

export default Posts;
