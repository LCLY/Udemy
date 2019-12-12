import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
class App extends Component {
	render() {
		return (
			<div>
				<h1>NOTE TO SELF</h1>
				<Form>
					<FormControl />
					<Button>Submit</Button>
				</Form>
			</div>
		);
	}
}
export default App;
