import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: ""
		},
		loading: false
	};

	orderHandler = e => {
		e.preventDefault();
		// console.log(this.props.ingredients);
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: "Henry",
				address: {
					street: "St 400",
					zipCode: "47906",
					country: "United States"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};
		axios
			.post("/orders.json", order)
			.then(res => {
				console.log(res);
				this.setState({ loading: false });
				// we will need to pass props into the render in checkout.js in order to obtain the props history
				// 	<Route
				// 	path={this.props.match.path + "/contact-data"}
				// 	render={props => (
				// 		<ContactData
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

	render() {
		let form = (
			<form>
				<input
					className={classes.Input}
					type="text"
					name="name"
					placeholder="Your name"
				/>
				<input
					className={classes.Input}
					type="email"
					name="email"
					placeholder="Your email"
				/>
				<input
					className={classes.Input}
					type="text"
					name="street"
					placeholder="Street"
				/>
				<input
					className={classes.Input}
					type="text"
					name="postal"
					placeholder="Postal Code"
				/>
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
