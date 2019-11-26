import React, { Component, PureComponent } from "react";
import Validation from "./Components/ValidationComponent";
import CharComponent from "./Components/CharComponent";
import styled from "styled-components";
import classes from "./App.css";
import AuthContext from "./context/auth-context";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary";
const StyledDiv = styled.div`
	background: ${props => (props.alt ? "yellow" : "blue")};
	&:hover {
		background-color: ${props => (props.alt ? "grey" : "red")};
	}
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.inputElementRef = React.createRef();
	}

	static contextType = AuthContext;

	componentDidMount() {
		this.inputElementRef.current.focus();
		console.log(this.context.authenticated);
	}

	state = {
		boolValue: true,
		input: "",
		btnClass: [classes.test],
		authenticated: false
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

		// const style = {
		// 	backgroundColor: "green",
		// 	":hover": {
		// 		backgroundColor: "lightgreen"
		// 	},
		// 	"@media (min-width:500px)": {
		// 		width: "450px"
		// 	}
		// };

		const toggleHandler = () => {
			console.log("yes");
			this.setState({ authenticated: !this.state.authenticated });
		};

		const flipColor = () => {
			this.setState({ boolValue: !this.state.boolValue });
			this.setState({ btnClass: this.state.btnClass.push(classes.Cool) });
			this.setState({ btnClass: this.state.btnClass.join(" ") });
		};

		return (
			<div className="App">
				<StyledDiv alt={this.state.boolValue}>
					<ol>
						<li className={this.state.btnClass}>
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
							Render a list of CharComponents where each CharComponent receives
							a different letter of the entered text (in the initial input
							field) as a prop.
						</li>
						<li>
							When you click a CharComponent, it should be removed from the
							entered text.
						</li>
					</ol>
					<p>
						Hint: Keep in mind that JavaScript strings are basically arrays!
					</p>
					<input
						type="text"
						// ref={inputEL => (this.refToElement = inputEL)}
						ref={this.inputElementRef}
						onChange={e => getLength(e)}
						value={this.state.input}
					></input>
					Anything inside
					<p>text length: {this.state.input.length}</p>
					<button onClick={toggleHandler}> toggle authenticate</button>
					<AuthContext.Provider
						value={{
							authenticated: this.state.authenticated,
							login: toggleHandler
						}}
					>
						<Validation inputLength={this.state.input.length} />
					</AuthContext.Provider>
					{charList}
					<ErrorBoundary>
						<button onClick={flipColor}>Flip the color</button>
					</ErrorBoundary>
				</StyledDiv>
			</div>
		);
	}
}

export default App;
