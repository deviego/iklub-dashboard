import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import AdminUsers from "./AdminUsers";
import Users from "./Users";
import Restaurant from "./Restaurant";
import AdminRestaurantUsers from "./AdminRestaurantUsers";
import Products from "./Products";
import PurchasedProducts from "./PurchasedProducts";
import { useAuthAdminRoute } from "~/hooks/useAuthAdminRoute";

const Admin: React.FC = () => {
	useAuthAdminRoute();

	const adminRoutes = "/dashboard/admin";
	return (
		<Switch>
			<Route exact path={adminRoutes} component={Home} />
			<Route path={adminRoutes + "/adminUsers"} component={AdminUsers} />
			<Route path={adminRoutes + "/users"}component={Users} />
			<Route path={adminRoutes + "/restaurants"} component={Restaurant} />
			<Route path={adminRoutes + "/adminRestaurantUsers"} component={AdminRestaurantUsers} />
			<Route path={adminRoutes + "/productsForAdmin"} component={Products} />
			<Route path={adminRoutes + "/purchasedProducts"} component={PurchasedProducts} />
		</Switch>
	);
};
export default observer(Admin);
