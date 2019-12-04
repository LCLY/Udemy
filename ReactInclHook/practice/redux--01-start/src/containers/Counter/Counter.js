import React, { Component } from "react";

import { connect } from "react-redux";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
	state = {
		counter: 0
	};

	counterChangedHandler = (action, value) => {
		switch (action) {
			case "inc":
				this.setState(prevState => {
					return { counter: prevState.counter + 1 };
				});
				break;
			case "dec":
				this.setState(prevState => {
					return { counter: prevState.counter - 1 };
				});
				break;
			case "add":
				this.setState(prevState => {
					return { counter: prevState.counter + value };
				});
				break;
			case "sub":
				this.setState(prevState => {
					return { counter: prevState.counter - value };
				});
				break;
		}
	};

	render() {
		return (
			<div>
				<CounterOutput value={this.props.ctr} />
				<CounterControl
					label="Increment"
					clicked={() => this.counterChangedHandler("inc")}
				/>
				<CounterControl
					label="Decrement"
					clicked={() => this.counterChangedHandler("dec")}
				/>
				<CounterControl
					label="Add 5"
					clicked={() => this.counterChangedHandler("add", 5)}
				/>
				<CounterControl
					label="Subtract 5"
					clicked={() => this.counterChangedHandler("sub", 5)}
				/>
			</div>
		);
	}
}

// to get the redux state and convert it into the form of props
const mapStateToProps = state => {
	return {
		// this is from the initalState in reducer
		ctr: state.counter
	};
};

export default connect(mapStateToProps)(Counter);
