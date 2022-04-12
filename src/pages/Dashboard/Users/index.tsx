import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import Details from "./Details";
import CreateOrEdit from "./Edit";
import DetailsPurchasedProducts from "./DetailsPurchasedProducts";

const Users: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/users" component={Table} />
		<Route
			path="/dashboard/users/details/:id"
			component={Details}
		/>
		<Route
			path="/dashboard/users/purchasedProducts/details/:id"
			component={DetailsPurchasedProducts}
		/>
		<Route
			path="/dashboard/users/edit/:id"
			component={CreateOrEdit}
		/>
	</Switch>
);

export default observer(Users);
