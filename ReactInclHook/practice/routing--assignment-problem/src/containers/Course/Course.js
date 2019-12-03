import React, { Component } from "react";

class Course extends Component {
	componentDidMount() {
		console.log(this.props.match);
	}
	componentDidUpdate() {
		this.loadData();
	}

	loadData() {
		if (this.props.match.params.id) {
			console.log(this.props.match.params.id);
		}
	}
	render() {
		return (
			<div>
				<h1>_COURSE_TITLE_</h1>
				<p>You selected the Course with ID: _ID_</p>
			</div>
		);
	}
}

export default Course;
