import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Table from "./Table";
import Details from "./Details";

const PurchasedProducts: React.FC = () => (
	<Switch>
		<Route exact path="/dashboard/purchasedProducts" component={Table} />
		<Route
			path="/dashboard/purchasedProducts/details/:id"
			component={Details}
		/>
	</Switch>
);

export default observer(PurchasedProducts);
