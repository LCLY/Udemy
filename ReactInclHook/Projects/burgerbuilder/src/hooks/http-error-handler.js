import { useState, useEffect } from "react";

export default httpClient => {
	const [error, setError] = useState(null);

	const reqInterceptor = httpClient.interceptors.request.use(req => {
		setError(null);
		return req;
	});

	const resInterceptor = httpClient.interceptors.response.use(
		res => res,
		err => {
			setError(err);
		}
	);

	// it will clean up whenever interceptors change
	useEffect(() => {
		return () => {
			httpClient.interceptors.request.eject(reqInterceptor);
			httpClient.interceptors.request.eject(resInterceptor);
		};
	}, [reqInterceptor, resInterceptor, httpClient.interceptors.request]);

	const errorConfirmedHandler = () => {
		setError(null);
	};

	return [error, errorConfirmedHandler];
};