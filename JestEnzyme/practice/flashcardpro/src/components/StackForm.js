import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addStack } from "../actions";
import {
	Form,
	FormGroup,
	FormControl,
	FormLabel,
	Button
} from "react-bootstrap";
export class StackForm extends Component {
	constructor() {
		super();
		this.state = {
			title: "",
			cards: []
		};
	}

	addCard() {
		const { cards } = this.state;
		cards.push({ id: cards.length, prompt: "", answer: "" });
		this.setState({ cards });
	}

	updateCardPart(e, index, part) {
		const { cards } = this.state;
		cards[index][part] = e.target.value;
		this.setState({ cards });
	}

	addStack() {
		this.props.addStack(this.state);
	}

	render() {
		return (
			<div>
				<Link to="/" className="link-home">
					<h4>Home</h4>
				</Link>
				<h4>Create a New Stack</h4>
				<br />
				<Form inline>
					<FormGroup>
						<FormLabel>Title:</FormLabel>
						<FormControl
							onChange={e => this.setState({ title: e.target.value })}
						/>
					</FormGroup>
					{this.state.cards.map((card, index) => {
						return (
							<div key={card.id}>
								<br />
								<FormGroup>
									<FormLabel>Prompt:</FormLabel>
									&nbsp;
									<FormControl
										onChange={e => this.updateCardPart(e, index, "prompt")}
									/>
									&nbsp;
									<FormLabel>Answer:</FormLabel>
									&nbsp;
									<FormControl
										onChange={e => this.updateCardPart(e, index, "answer")}
									/>
								</FormGroup>
							</div>
						);
					})}
				</Form>
				<br />
				<Button onClick={() => this.addCard()}>Add Card</Button>
				&nbsp;
				<Button onClick={() => this.addStack()}>Save and Add the stack</Button>
			</div>
		);
	}
}

export default connect(null, { addStack })(StackForm);
