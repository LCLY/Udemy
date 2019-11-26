import React from "react";

const authContext = React.createContext({
	authenticated: false,
	login: () => {
		console.log("wtf");
	}
});

export default authContext;
