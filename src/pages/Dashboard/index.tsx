import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import { MainLayout } from "~/layout";
import Users from "./Users";
import Restaurant from "./Restaurant";


const Dashboard: React.FC = () => (
	<MainLayout>
		<Switch>
			<Route
				exact
				path="/"
				component={Home}
			/>
			<Route path="/dashboard/users" component={Users} />
			<Route path="/dashboard/restaurants" component={Restaurant} />
		</Switch>
	</MainLayout>
);
export default observer(Dashboard);
