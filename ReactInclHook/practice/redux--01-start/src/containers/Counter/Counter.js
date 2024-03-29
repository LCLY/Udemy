import React, { Component } from "react";

import { connect } from "react-redux";
// import * as actionTypes from "../../store/actions";
import * as actionCreators from "../../store/actions/index";
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
		onIncrementCounter: () => dispatch(actionCreators.increment()),
		onDecrementCounter: () => dispatch(actionCreators.decrement()),
		onAdd: () => dispatch(actionCreators.add(10)),
		onSubtract: () => dispatch(actionCreators.subtract(15)),
		onStoreResult: result => dispatch(actionCreators.storeResult(result)),
		onDeleteResult: id => dispatch(actionCreators.deleteResult(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
