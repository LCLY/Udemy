import React, { Component } from "react";
import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
	state = {
		loadedPost: null
	};
	componentDidUpdate() {
		if (this.props.id) {
			// check if theres no existing loadedPost then fetch one first to fill up the empty state
			// only do a new get if the current selected post is different than the previous one that was stored in loadedPost
			if (
				!this.state.loadedPost ||
				(this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
			) {
				axios
					.get("https://jsonplaceholder.typicode.com/posts/" + this.props.id)
					.then(res => {
						this.setState({ loadedPost: res.data });
					});
			}
		}
	}
	render() {
		let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
		if (this.props.id) {
			post = <p style={{ textAlign: "center" }}>Loading...</p>;
		}
		// only render if loadedPost has data
		if (this.state.loadedPost) {
			post = (
				<div className="FullPost">
					<h1>{this.state.loadedPost.title}</h1>
					<p>{this.state.loadedPost.content}</p>
					<div className="Edit">
						<button className="Delete">Delete</button>
					</div>
				</div>
			);
		}

		return post;
	}
}

export default FullPost;