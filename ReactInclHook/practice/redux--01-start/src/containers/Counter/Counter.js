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
					clicked={this.props.onIncrementCounter}
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

// which kind of action to dispatch
// the dispatch argument will be a function
const mapDispatchToProps = dispatch => {
	return {
		onIncrementCounter: () => dispatch({ type: "INCREMENT" })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
