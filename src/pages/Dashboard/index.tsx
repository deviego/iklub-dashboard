import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import { MainLayout } from "~/layout";
import AdminUsers from "./AdminUsers";
import Users from "./Users";
import Restaurant from "./Restaurant";
import AdminRestaurantUsers from "./AdminRestaurantUsers";


const Dashboard: React.FC = () => (
	<MainLayout>
		<Switch>
			<Route
				exact
				path="/"
				component={Home}
			/>
			<Route
				exact
				path="/dashboard"
				component={Home}
			/>
			<Route path="/dashboard/adminUsers" component={AdminUsers} />
			<Route path="/dashboard/users" component={Users} />
			<Route path="/dashboard/restaurants" component={Restaurant} />
			<Route path="/dashboard/adminRestaurantUsers" component={AdminRestaurantUsers} />
		</Switch>
	</MainLayout>
);
export default observer(Dashboard);
