import React from "react";
// Lazy loading
// it takes a function as an input
const asyncComponent = importComponent => {
	return class extends React.Component {
		state = {
			component: null
		};
		componentDidMount() {
			// this function will use this dynamic import syntax and give us a promise
			// where we eventaully get the copmonent we want it to load

			importComponent().then(cmp => {
				this.setState({ component: cmp.default });
			});
		}
		// and where we then render this component
		render() {
			const C = this.state.component;
			return C ? <C {...this.props} /> : null;
		}
	};
};

export default asyncComponent;
