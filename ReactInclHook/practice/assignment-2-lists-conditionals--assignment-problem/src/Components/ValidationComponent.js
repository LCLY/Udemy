import React from "react";
import AuthContext from "../context/auth-context";
class Validation extends React.Component {
	constructor(props) {
		super(props);
	}

	static contextType = AuthContext;
	componentDidMount() {
		console.log("context:", this.context.authenticated);
	}

	componentDidUpdate() {
		console.log("context:", this.context.authenticated);
	}
	render() {
		let message = "Text long enough";

		if (this.props.inputLength <= 5) {
			message = "Text too short";
		}
		return (
			<div>
				{
					<div>
						Authenticated:
						{this.context.authenticated ? <p>True</p> : <p>False</p>}
						{message}
						<button onClick={this.context.login}>Swap</button>
					</div>
				}
			</div>
		);
	}
}

export default Validation;
