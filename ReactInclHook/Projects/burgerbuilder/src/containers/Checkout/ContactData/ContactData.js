import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";
const ContactData = props => {
	/* ========== class ========== */
	/*state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your name"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP Code"
				},
				value: "",
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Email"
				},
				value: "",
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				},
				value: "fastest",
				validation: {},
				valid: true
			}
		},
		formIsValid: false
	};*/

	/* ========== functional ========== */
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Your name"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		street: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Street"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "ZIP Code"
			},
			value: "",
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: "input",
			elementConfig: {
				type: "text",
				placeholder: "Country"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		email: {
			elementType: "input",
			elementConfig: {
				type: "email",
				placeholder: "Your Email"
			},
			value: "",
			validation: {
				required: true
			},
			valid: false,
			touched: false
		},
		deliveryMethod: {
			elementType: "select",
			elementConfig: {
				options: [
					{ value: "fastest", displayValue: "Fastest" },
					{ value: "cheapest", displayValue: "Cheapest" }
				]
			},
			value: "fastest",
			validation: {},
			valid: true
		}
	});
	const [formIsValid, setFormIsValid] = useState(false);

	const orderHandler = e => {
		e.preventDefault();
		// console.log(this.props.ingredients);

		// no longer needed
		// this.setState({ loading: true });

		const formData = {};
		// create new objects with the value from this.state.orderForm
		// e.g. name:value, email:value, zipcode:value, country:value
		for (let formElementIdentifier in orderForm) {
			formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
		}

		// then add the formData to orderData in order object and push it to firebase

		const order = {
			ingredients: props.ings,
			price: props.price,
			orderData: formData,
			userId: props.userId // adding user id here to only show order that is related to the user with the userid, now we are sending this to the database
		};

		props.onBurgerOrder(order, props.token);
	};

	const inputChangedHandler = (e, inputIdentifier) => {
		// const updatedOrderForm = {
		// 	...this.state.orderForm
		// };
		// console.log(this.state.orderForm[inputIdentifier]);

		// OLD CODE
		/*const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		// change the value with the e.target.value
		updatedFormElement.value = e.target.value;

		// check whether validation is necessary
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);

		updatedFormElement.touched = true;*/

		// the code above is refactored using updateObject to below
		const updatedFormElement = updateObject(orderForm[inputIdentifier], {
			value: e.target.value,
			valid: checkValidity(
				e.target.value,
				orderForm[inputIdentifier].validation
			),
			touched: true
		});
		// OLD CODE
		/*	const updatedOrderForm = {
			...this.state.orderForm
		};

		// we replace the temp orderForm's name object with the updatedFormElement (value changed)
		updatedOrderForm[inputIdentifier] = updatedFormElement;*/

		// REFACTORED CODE
		const updatedOrderForm = updateObject(orderForm, {
			[inputIdentifier]: updatedFormElement
		});

		// false && false: false
		// false && true: false
		// true && false: false
		// true && true: true
		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		// console.log(formIsValid);

		// then we update the whole state
		/* ========== class ========== */
		// this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
		/* ========== functional ========== */
		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	};

	// convert object to array
	const formElementsArray = [];

	for (let key in orderForm) {
		formElementsArray.push({ id: key, config: orderForm[key] });
	}
	let form = (
		<form onSubmit={orderHandler}>
			{formElementsArray.map(formElement => (
				// config is the object from formElementsArray that stores the reference in it
				<Input
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					invalid={!formElement.config.valid}
					shouldValidate={formElement.config.validation}
					touched={formElement.config.touched}
					changed={e => inputChangedHandler(e, formElement.id)}
				/>
			))}
			<Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>
				ORDER
			</Button>
		</form>
	);

	if (props.loading) {
		form = <Spinner />;
	}
	return (
		<div className={classes.ContactData}>
			<h4>Enter Your Contact Data</h4>
			{form}
		</div>
	);
};
const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onBurgerOrder: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
