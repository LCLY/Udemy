import { useReducer, useCallback } from "react";
// hook is just a function treated specially by react
const httpReducer = (currHttpState, action) => {
	switch (action.type) {
		case "SEND":
			return { isLoading: true, error: null, data: null, extra: action.extra };
		case "RESPONSE":
			return {
				...currHttpState,
				isLoading: false,
				error: null,
				data: action.responseData
			};
		case "ERROR":
			return { isLoading: false, error: action.error };
		case "CLEAR":
			return { ...currHttpState, error: null };
		default:
			throw new Error("Should not get here");
	}
};
const useHttp = () => {
	const [httpState, dispatchHttp] = useReducer(httpReducer, {
		isLoading: false,
		error: null,
		data: null,
		extra: null
	});

	// need to use this to prevent rerender when ingredient rerenders, since the http functions
	// are already using useCallback, we might as well use it
	const sendRequest = useCallback((url, method, body, reqExtra) => {
		// we are making a flexible http function that takes in different arguments
		dispatchHttp({ type: "SEND", extra: reqExtra });
		fetch(url, {
			method: method,
			body: body,
			headers: { "Content-Type": "application/json" }
		})
			.then(res => {
				return res.json();
			})
			.then(res => {
				dispatchHttp({ type: "RESPONSE", responseData: res });
			})
			.catch(err => {
				dispatchHttp({ type: "ERROR", error: "SOMETHINGS WRONG" });
			});
	}, []);

	return {
		// from the hooks
		isLoading: httpState.loading,
		data: httpState.data,
		error: httpState.error,
		// sending the function outside
		sendRequest: sendRequest,
		reqExtra: httpState.reqExtra
	};
};

export default useHttp;
