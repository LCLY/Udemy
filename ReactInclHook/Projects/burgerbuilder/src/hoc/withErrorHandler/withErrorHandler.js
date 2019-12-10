import React from "react";
import Modal from "../../components/UI/Modal/Modal";

// using custom hook
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, clearError] = useHttpErrorHandler(axios);
		/* ========== class========== */
		// state = {
		// 	error: null
		// };
		/* ========== functional========== */
		// const [error, setError] = useState(null);

		// const reqInterceptor = axios.interceptors.request.use(req => {
		// 	setError(null);
		// 	return req;
		// });

		// const resInterceptor = axios.interceptors.response.use(
		// 	res => res,
		// 	err => {
		// 		setError(err);
		// 	}
		// );

		// since this anonymous class component might be used by multiple components,
		// they will keep calling the axios interceptors even though they dont need it
		// anymore, and that will cause memory leaks, so what we can do is to clean up
		// the memory using componentWillUnmount

		/* ========== class========== */
		// componentWillUnmount() {
		// 	axios.interceptors.request.eject(this.reqInterceptor);
		// 	axios.interceptors.request.eject(this.resInterceptor);
		// }
		/* ========== functional========== */
		// it will clean up whenever interceptors change
		// useEffect(() => {
		// 	return () => {
		// 		axios.interceptors.request.eject(reqInterceptor);
		// 		axios.interceptors.request.eject(resInterceptor);
		// 	};
		// }, [reqInterceptor, resInterceptor]);

		// const errorConfirmedHandler = () => {
		// 	setError(null);
		// };

		return (
			<>
				<Modal show={error} modalClosed={clearError}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</>
		);
	};
};

export default withErrorHandler;
