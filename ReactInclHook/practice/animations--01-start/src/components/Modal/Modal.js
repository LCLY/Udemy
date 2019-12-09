import React from "react";

// import { Transition } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

const animationTiming = {
	enter: 400,
	exit: 1000
};
const modal = props => {
	return (
		// <Transition
		// 	mountOnEnter
		// 	unmountOnExit
		// 	in={props.show}
		// 	timeout={animationTiming}
		// >
		// 	{state => {
		// 		const cssClasses = [
		// 			"Modal",
		// 			// if props.show is entering do modal open
		// 			//else if props.show is exiting then do modal closed else null
		// 			state === "entering"
		// 				? "ModalOpen"
		// 				: state === "exiting"
		// 				? "ModalClosed"
		// 				: null
		// 		];
		// 		return (
		// 			<div className={cssClasses.join(" ")}>
		// 				<h1>A Modal</h1>
		// 				<button className="Button" onClick={props.closed}>
		// 					Dismiss
		// 				</button>
		// 			</div>
		// 		);
		// 	}}
		// </Transition>

		// CSSTransition
		<CSSTransition
			mountOnEnter
			unmountOnExit
			in={props.show}
			timeout={animationTiming}
			classNames="fade-slide"
		>
			<div className="Modal">
				<h1>A Modal</h1>
				<button className="Button" onClick={props.closed}>
					Dismiss
				</button>
			</div>
		</CSSTransition>
	);
};

export default modal;
