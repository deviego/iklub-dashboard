import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import CreateOrEdit from "./CreateOrEdit";
// import Details from "./Details";

const Users: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/adminUsers" component={Table} />
		<Route
			path="/dashboard/adminUsers/create/"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/adminUsers/edit/:id"
			component={CreateOrEdit}
		/>
		{/* <Route
			path="/dashboard/adminUsers/details/:id"
			component={Details}
		/> */}
	</Switch>
);

export default observer(Users);
