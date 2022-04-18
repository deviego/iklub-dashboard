import React from "react";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Products from "./Products";
import { useAuthRestaurantRoute } from "~/hooks/useAuthRestaurantRoute";
import PurchasedProducts from "./PurchasedProducts";
import RestaurantProfile from "./RestaurantProfile";

const Restaurant: React.FC = () => {
	useAuthRestaurantRoute();

	const restaurantRoutes = "/dashboard/restaurant";
	return (
		<Switch>
			<Route exact path={restaurantRoutes + "/"} component={Home} />
			<Route path={restaurantRoutes + "/restaurantProfile/:id"} component={RestaurantProfile} />
			<Route path={restaurantRoutes + "/products"} component={Products} />
			<Route path={restaurantRoutes + "/purchasedProducts"} component={PurchasedProducts} />

		</Switch>
	);
};
export default observer(Restaurant);
