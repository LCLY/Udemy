import React, { Component } from "react";

class Clue extends Component {
	state = {
		reveal: false
	};
	render() {
		const { answer, question, value } = this.props.clue;
		return (
			<div className="clue" onClick={() => this.setState({ reveal: true })}>
				{/* if not defined, show unknown string */}
				<h4>{value || "unknown"}</h4>
				<h4 />
				<h5>{question}</h5>
				<hr />
				<h5 className={this.state.reveal ? "text-revealed" : "text-hidden"}>
					{answer}
				</h5>
			</div>
		);
	}
}

export default Clue;
