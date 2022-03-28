import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import { MainLayout } from "~/layout";
import AdminUsers from "./AdminUsers";

const Dashboard: React.FC = () => (
	<MainLayout>
		<Switch>
			<Route
				exact
				path="/"
				component={Home}
			/>
			<Route path="/dashboard/adminUsers" component={AdminUsers} />
		</Switch>
	</MainLayout>
);
export default observer(Dashboard);
