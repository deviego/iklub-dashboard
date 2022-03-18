import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import { MainLayout } from "~/layout";


const Dashboard: React.FC = () => (
	<MainLayout>
		<Switch>
			<Route
				exact
				path="/"
				component={Home}
			/>
		</Switch>
	</MainLayout>
);
export default observer(Dashboard);
