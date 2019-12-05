import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
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
					clicked={this.props.onDecrementCounter}
				/>
				<CounterControl label="Add 5" clicked={this.props.onAdd} />
				<CounterControl label="Subtract 5" clicked={this.props.onSubtract} />
				<hr />
				<button onClick={() => this.props.onStoreResult(this.props.ctr)}>
					Store Result
				</button>
				<ul>
					{this.props.storedResults.map(strResult => (
						<li
							key={strResult.id}
							onClick={() => this.props.onDeleteResult(strResult.id)}
						>
							{strResult.value}
						</li>
					))}
				</ul>
			</div>
		);
	}
}

// to get the redux state and convert it into the form of props
const mapStateToProps = state => {
	return {
		// this is from the initalState in reducer
		ctr: state.ctr.counter,
		storedResults: state.res.results
	};
};

// which kind of action to dispatch
// the dispatch argument will be a function
const mapDispatchToProps = dispatch => {
	return {
		onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
		onDecrementCounter: () => dispatch({ type: actionTypes.DECREMENT }),
		onAdd: () => dispatch({ type: actionTypes.ADD, val: 10 }),
		onSubtract: () => dispatch({ type: actionTypes.SUBTRACT, val: 15 }),
		onStoreResult: result =>
			dispatch({ type: actionTypes.STORE_RESULT, result: result }),
		onDeleteResult: id =>
			dispatch({ type: actionTypes.DELETE_RESULT, resultElementId: id })
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
