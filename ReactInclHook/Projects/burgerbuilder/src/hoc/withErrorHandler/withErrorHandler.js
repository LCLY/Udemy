import React from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends React.Component {
		state = {
			error: null
		};
		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});

			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error: error });
				}
			);
		}

		// since this anonymous class component might be used by multiple components,
		// they will keep calling the axios interceptors even though they dont need it
		// anymore, and that will cause memory leaks, so what we can do is to clean up
		// the memory using componentWillUnmount
		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.request.eject(this.resInterceptor);
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<>
					<Modal
						show={this.state.error}
						modalClosed={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};

export default withErrorHandler;
