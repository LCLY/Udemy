import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
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
			price: this.props.totalPrice,
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
				this.setState({ loading: false, purchasing: false });
			})
			.catch(err => {
				console.log(err);
				this.setState({ loading: false, purchasing: false });
			});
	};

	render() {
		return (
			<div className={classes.ContactData}>
				<h4>Enter Your Contact Data</h4>
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
			</div>
		);
	}
}

export default ContactData;
