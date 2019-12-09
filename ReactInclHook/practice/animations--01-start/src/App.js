import React, { Component } from "react";
import { Transition } from "react-transition-group";
import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
	state = {
		modalIsOpen: false,
		showBlock: false
	};

	showModal = () => {
		this.setState({ modalIsOpen: true });
	};
	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};
	render() {
		return (
			<div className="App">
				<h1>React Animations</h1>
				<button
					className="Button"
					onClick={() =>
						this.setState(prevState => ({ showBlock: !prevState.showBlock }))
					}
				>
					Toggle
				</button>
				<br />
				<br />
				{/* in determines whether the wrapped component should be visible or not */}
				{/* timeout is 300ms */}
				<Transition
					mountOnEnter
					unmountOnExit
					in={this.state.showBlock}
					timeout={1000}
				>
					{state => (
						<div
							style={{
								margin: "10px auto",
								border: "1px solid black",
								background: "yellow",
								width: 100,
								height: 100,
								transition: "all 1s ease-out",
								opacity: state === "exiting" ? 0 : 1
							}}
						></div>
					)}
				</Transition>
				{this.state.modalIsOpen ? (
					<Modal show={this.state.modalIsOpen} closed={this.closeModal} />
				) : null}
				{this.state.modalIsOpen ? (
					<Backdrop show={this.state.modalIsOpen} />
				) : null}
				<button className="Button" onClick={this.showModal}>
					Open Modal
				</button>
				<h3>Animating Lists</h3>
				<List />
			</div>
		);
	}
}

export default App;
