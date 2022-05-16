import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import { useAuthRoute } from "../../hooks/useAuthRoute";
import { useHistory, useLocation } from "react-router";
import { MainLayout } from "~/layout";
import Admin from "./Admin";
import Restaurant from "./Restaurant";
import API from "~/resources/api";

const Dashboard: React.FC = () => {
	const location = useLocation();
	const history = useHistory();
	const onSuccess = (admin: API.AdminUser) => {
		if (location.pathname  === "/dashboard") {
			if (admin.restaurant) {
				history.push("/dashboard/restaurant");
			} else {
				history.push("/dashboard/admin");
			}
		}
	};
	useAuthRoute(onSuccess);
	return (
		<MainLayout>
			<Switch>
				<Route path="/dashboard/admin" component={Admin} />
				<Route path="/dashboard/restaurant" component={Restaurant} />
			</Switch>
		</MainLayout>
	);
};
export default observer(Dashboard);
