import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
class ContactData extends Component {
	state = {
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
	};

	orderHandler = e => {
		e.preventDefault();
		// console.log(this.props.ingredients);

		// no longer needed
		// this.setState({ loading: true });

		const formData = {};
		// create new objects with the value from this.state.orderForm
		// e.g. name:value, email:value, zipcode:value, country:value
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}

		// then add the formData to orderData in order object and push it to firebase
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};

		this.props.onBurgerOrder(order);
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (rules.required) {
			// remove whitespace so if theres whitespace it doenst count as a valid input
			// value.trim() !== "" returns when you type in words because it is indeed not
			// an empty string when you type in something
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	inputChangedHandler = (e, inputIdentifier) => {
		// console.log(this.state.orderForm[inputIdentifier]);
		const updatedOrderForm = {
			...this.state.orderForm
		};

		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		// change the value with the e.target.value
		updatedFormElement.value = e.target.value;

		// check whether validation is necessary
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);

		updatedFormElement.touched = true;

		// we replace the temp orderForm's name object with the updatedFormElement (value changed)
		updatedOrderForm[inputIdentifier] = updatedFormElement;
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
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		// convert object to array
		const formElementsArray = [];

		for (let key in this.state.orderForm) {
			formElementsArray.push({ id: key, config: this.state.orderForm[key] });
		}
		let form = (
			<form onSubmit={this.orderHandler}>
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
						changed={e => this.inputChangedHandler(e, formElement.id)}
					/>
				))}
				<Button
					btnType="Success"
					disabled={!this.state.formIsValid}
					clicked={this.orderHandler}
				>
					ORDER
				</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Data</h4>
				{form}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice,
		loading: state.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onBurgerOrder: orderData => dispatch(actions.purchaseBurger(orderData))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));
