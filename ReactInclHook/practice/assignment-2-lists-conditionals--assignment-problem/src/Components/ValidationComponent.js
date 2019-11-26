import React from "react";
import AuthContext from "../context/auth-context";
const Validation = props => {
	let message = "Text long enough";

	if (props.inputLength <= 5) {
		message = "Text too short";
	}
	return (
		<AuthContext.Consumer>
			{context => (
				<div>
					Authenticated:
					{context.authenticated ? <p>True</p> : <p>False</p>}
					{message}
					<button onClick={context.login}>Swap</button>
				</div>
			)}
		</AuthContext.Consumer>
	);
};

export default Validation;
