import React, { Component } from "react";

class Course extends Component {
	state = { courseTitle: "" };
	componentDidMount() {
		this.parseQueryParams();
	}

	componentDidUpdate() {
		this.parseQueryParams();
	}

	parseQueryParams() {
		console.log("Course", this.props);
		const query = new URLSearchParams(this.props.location.search);
		// query will act as an iterator where we can loop through the objects within it
		for (let param of query.entries()) {
			console.log("param", param);
			// change the state if the title is not same to the current one stored in state
			if (this.state.courseTitle !== param[1]) {
				this.setState({ courseTitle: param[1] });
			}
		}
	}

	render() {
		return (
			<div>
				<h1>{this.state.courseTitle}</h1>
				<p>
					You selected the Course with ID:{this.props.match.params.courseId}
				</p>
			</div>
		);
	}
}

export default Course;
