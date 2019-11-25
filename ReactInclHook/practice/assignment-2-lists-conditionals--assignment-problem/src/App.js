import React, { Component } from "react";
import Validation from "./Components/ValidationComponent";
import CharComponent from "./Components/CharComponent";
import Styled from "styled-components";
import "./App.css";

const StyledDiv = Styled.div`
	backgroundcolor: red;
`;

class App extends Component {
	state = {
		input: ""
	};

	render() {
		const getLength = e => {
			let str = e.target.value;
			this.setState({ input: str });
		};

		// delete characters, joining back char Array to become a string and update the state
		const clickHandler = index => {
			const text = this.state.input.split("");
			text.splice(index, 1);
			const updateText = text.join("");
			this.setState({ input: updateText });
		};

		// returning a new array of characters
		const charList = this.state.input.split("").map((ch, index) => {
			return (
				<CharComponent
					clicked={() => clickHandler(index)}
					character={ch}
					key={index}
				/>
			);
		});

		const style = {
			backgroundColor: "green",
			":hover": {
				backgroundColor: "lightgreen"
			},
			"@media (min-width:500px)": {
				width: "450px"
			}
		};

		return (
			<div className="App">
				<ol>
					<li>
						Create an input field (in App component) with a change listener
						which outputs the length of the entered text below it (e.g. in a
						paragraph).
					</li>
					<li>
						Create a new component (=> ValidationComponent) which receives the
						text length as a prop
					</li>
					<li>
						Inside the ValidationComponent, either output "Text too short" or
						"Text long enough" depending on the text length (e.g. take 5 as a
						minimum length)
					</li>
					<li>
						Create another component (=> CharComponent) and style it as an
						inline box (=> display: inline-block, padding: 16px, text-align:
						center, margin: 16px, border: 1px solid black).
					</li>
					<li>
						Render a list of CharComponents where each CharComponent receives a
						different letter of the entered text (in the initial input field) as
						a prop.
					</li>
					<li>
						When you click a CharComponent, it should be removed from the
						entered text.
					</li>
				</ol>
				<p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>
				<input
					type="text"
					onChange={e => getLength(e)}
					value={this.state.input}
				></input>
				<StyledDiv>TEST</StyledDiv>
				<p>text length: {this.state.input.length}</p>
				<Validation inputLength={this.state.input.length} />
				{charList}
			</div>
		);
	}
}

export default App;
