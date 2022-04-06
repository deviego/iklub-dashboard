import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import CreateOrEdit from "./CreateOrEdit";
import Details from "./Details";

const Products: React.FC = () => {
	const productsRoute = "/dashboard/produ";
	return (
		<Switch>
			<Route exact path={productsRoute} component={Table} />
			<Route
				path={`${productsRoute}/create/`}
				component={CreateOrEdit}
			/>
			<Route
				path={`${productsRoute}/edit/:id`}
				component={CreateOrEdit}
			/>
			<Route
				path={`${productsRoute}/details/:id`}
				component={Details}
			/>
		</Switch>
	);
};

export default observer(Products);
