import {
	AiOutlineHome,
} from "react-icons/ai";

import {
	RiRestaurant2Line,
	RiUserLine,
	RiUserFollowLine,
} from "react-icons/ri";

import {
	MdPersonOutline,
} from "react-icons/md";

import { BiCoffee, BiCart, BiWallet } from "react-icons/bi";
import { ImGlass } from "react-icons/im";
import strings from "../resources/strings";
import API from "~/resources/api";

const useMainRoutes = (currentUser: API.AdminUser | null) => {
	const isRestaurantAdminUser = !!currentUser?.restaurant;

	const createAdminRoute = (path?: string) => `/dashboard/admin${path ? "/" + path : ""}`;
	const createRestaurantRoute = (path?: string) => `/dashboard/restaurant${path ? "/" + path : ""}`;

	const adminRoutes = [
		{
			Icon: AiOutlineHome,
			text: strings.nav.home,
			path: createAdminRoute(),
		},
		{
			Icon: RiUserFollowLine,
			text: strings.nav.adminUsers,
			path: createAdminRoute("adminUsers"),
		},
		{
			Icon: RiUserFollowLine,
			text: strings.nav.adminRestaurantUsers,
			path: createAdminRoute("adminRestaurantUsers"),
		},
		{
			Icon: RiUserLine,
			text: strings.nav.users,
			path: createAdminRoute("users"),
		},
		{
			Icon: RiRestaurant2Line,
			text: strings.nav.restaurants,
			path: createAdminRoute("restaurants"),
		},
		{
			Icon: BiCoffee,
			text: strings.nav.products,
			path: createAdminRoute("productsForAdmin"),
		},
		{
			Icon: BiCart,
			text: strings.nav.purchasedProducts,
			path: createAdminRoute("purchasedProducts"),
		},
	];

	const restaurantAdminUserRoutes = [
		{
			Icon: AiOutlineHome,
			text: strings.nav.home,
			path: createRestaurantRoute(),
		},
		{
			Icon: MdPersonOutline,
			text: strings.nav.restaurantProfile,
			path: createRestaurantRoute(`restaurantProfile/${currentUser?.id}`),
		},
		{
			Icon: BiCoffee,
			text: strings.nav.products,
			path: createRestaurantRoute("products"),
		},
		{
			Icon: BiCart,
			text: strings.nav.purchasedProducts,
			path: createRestaurantRoute("purchasedProducts"),
		},
		{
			Icon: ImGlass,
			text: strings.nav.consumptions,
			path: createRestaurantRoute("consumptions"),
		},
		{
			Icon: BiWallet,
			text: strings.nav.wallet,
			path: createRestaurantRoute("wallet/" + currentUser?.restaurant?.id),
		},
	];

	return isRestaurantAdminUser ? restaurantAdminUserRoutes : adminRoutes;
};

export default useMainRoutes;
