import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import CreateOrEdit from "./CreateOrEdit";
import Details from "./Details";

const AdminRestaurantUsers: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/admin/adminRestaurantUsers" component={Table} />
		<Route
			path="/dashboard/admin/adminRestaurantUsers/create/"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/admin/adminRestaurantUsers/edit/:id"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/admin/adminRestaurantUsers/details/:id"
			component={Details}
		/>
	</Switch>
);

export default observer(AdminRestaurantUsers);
