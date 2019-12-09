import React from "react";

import "./Modal.css";

const modal = props => {
	const cssClasses = [
		"Modal",
		// if props.show is entering do modal open
		//else if props.show is exiting then do modal closed else null
		props.show === "entering"
			? "ModalOpen"
			: props.show === "exiting"
			? "ModalClosed"
			: null
	];
	return (
		<div className={cssClasses.join(" ")}>
			<h1>A Modal</h1>
			<button className="Button" onClick={props.closed}>
				Dismiss
			</button>
		</div>
	);
};

export default modal;
