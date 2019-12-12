import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import Note from "./Note";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";

const cookie_key = "NOTES";

class App extends Component {
	constructor() {
		super();
		this.state = {
			text: "",
			notes: []
		};
	}

	componentDidMount() {
		this.setState({ notes: read_cookie(cookie_key) }); //shorthand syntax
	}

	submit = () => {
		const { notes, text } = this.state;
		const newNote = { text };
		notes.push(newNote);
		this.setState({ notes });
		bake_cookie(cookie_key, this.state.notes);
	};

	clear() {
		delete_cookie(cookie_key);
		this.setState({ notes: [] });
	}
	render() {
		return (
			<div>
				<h1>NOTE TO SELF</h1>
				<Form inline>
					<FormControl
						onChange={e => {
							this.setState({ text: e.target.value });
						}}
					/>
					&nbsp;
					<Button onClick={() => this.submit()}>Submit</Button>
				</Form>
				{this.state.notes.map((note, i) => {
					return <Note key={i} note={note}></Note>;
				})}
				<hr />
				<Button onClick={() => this.clear()}>Clear Notes</Button>
			</div>
		);
	}
}
export default App;
