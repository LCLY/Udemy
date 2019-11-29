import React from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
// turn this into a stateful component to handle backdrop
class Layout extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerOpenHandler = () => {
		this.setState({ showSideDrawer: true });
	};

	render() {
		return (
			<>
				<Toolbar openSide={this.sideDrawerOpenHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>
				<main className={classes.Content}>{this.props.children}</main>
			</>
		);
	}
}

export default Layout;
