import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import CreateOrEdit from "./CreateOrEdit";
import Details from "./Details";
import CreateOrEditAdminUser from "./Details/AdminUsers/CreateOrEdit/";

const Restaurant: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/admin/restaurants" component={Table} />
		<Route
			path="/dashboard/admin/restaurants/create/"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/admin/restaurants/edit/:id"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/admin/restaurants/details/:id"
			component={Details}
		/>
		<Route
			path="/dashboard/admin/restaurants/:restaurantId/adminUsers/create/"
			component={CreateOrEditAdminUser}
		/>
		<Route
			path="/dashboard/admin/restaurants/:restaurantId/adminUsers/edit/:userId"
			component={CreateOrEditAdminUser}
		/>
	</Switch>
);

export default observer(Restaurant);
