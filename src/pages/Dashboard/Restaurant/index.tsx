import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import CreateOrEdit from "./CreateOrEdit";
// import Details from "./Details";

const Restaurant: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/restaurants" component={Table} />
		<Route
			path="/dashboard/restaurant/create/"
			component={CreateOrEdit}
		/>
		<Route
			path="/dashboard/restaurant/edit/:id"
			component={CreateOrEdit}
		/>
		{/* <Route
			path="/dashboard/restaurant/details/:id"
			component={Details}
		/> */}
	</Switch>
);

export default observer(Restaurant);
