import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your name"
				},
				value: ""
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: ""
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "ZIP Code"
				},
				value: ""
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: ""
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Your Email"
				},
				value: ""
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				},
				value: ""
			}
		},
		loading: false
	};

	orderHandler = e => {
		e.preventDefault();
		// console.log(this.props.ingredients);
		this.setState({ loading: true });

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
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		};
		axios
			.post("/orders.json", order)
			.then(res => {
				console.log(res);
				this.setState({ loading: false });
				// we will need to pass props into the render in checkout.js in order to obtain the props history
				// <Route
				//  	path={this.props.match.path + "/contact-data"}
				//  	render={props => (
				// 	 	<ContactData
				// 			ingredients={this.state.ingredients}
				// 			price={this.state.totalPrice}
				// 			{...props}
				// 		/>
				// 	)}
				// />
				this.props.history.push("/"); //redirect to homepage
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false });
			});
	};

	inputChangedHandler = (e, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm
		};
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
		// change the value with the e.target.value
		updatedFormElement.value = e.target.value;
		// we replace the temp orderForm's name object with the updatedFormElement (value changed)
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		// then we update the whole state
		this.setState({ orderForm: updatedOrderForm });
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
						changed={e => this.inputChangedHandler(e, formElement.id)}
					/>
				))}
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
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

export default ContactData;
