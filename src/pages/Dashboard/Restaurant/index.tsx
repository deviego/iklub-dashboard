import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import CreateOrEdit from "./CreateOrEdit";
import Details from "./Details";
import CreateOrEditAdminUser from "../AdminUsers/CreateOrEdit";

const Restaurant: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/restaurants" component={Table} />
		<Route
			path="/dashboard/restaurants/create/"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/restaurants/edit/:id"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/restaurants/details/:id"
			component={Details}
		/>
		<Route
			path="/dashboard/adminUsers/create/"
			component={CreateOrEditAdminUser}
		/>
		<Route
			path="/dashboard/adminUsers/edit/:id"
			component={CreateOrEditAdminUser}
		/>
	</Switch>
);

export default observer(Restaurant);
