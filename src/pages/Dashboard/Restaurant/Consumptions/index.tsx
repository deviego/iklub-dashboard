import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import Details from "./Details";

const Consumptions: React.FC = () => {
	const consumptionsRoute = "/dashboard/restaurant/consumptions";
	return (
		<Switch>
			<Route exact path={consumptionsRoute} component={Table} />
			<Route
				path={`${consumptionsRoute}/details/:id`}
				component={Details}
			/>
		</Switch>
	);
};

export default observer(Consumptions);
