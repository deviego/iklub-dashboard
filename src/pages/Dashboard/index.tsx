import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import { useAuthRoute } from "../../hooks/useAuthRoute";
import { MainLayout } from "~/layout";
import Home from "./Home";
import AdminUsers from "./AdminUsers";
import Users from "./Users";
import Restaurant from "./Restaurant";
import Products from "./Products";

const Dashboard: React.FC = () => {
	useAuthRoute();
	return (
		<MainLayout>
			<Switch>
				<Route exact path="/dashboard" component={Home} />
				<Route path="/dashboard/adminUsers" component={AdminUsers} />
				<Route path="/dashboard/users" component={Users} />
				<Route path="/dashboard/restaurants" component={Restaurant} />
				<Route path="/dashboard/products" component={Products} />
			</Switch>
		</MainLayout>
	);
};
export default observer(Dashboard);
