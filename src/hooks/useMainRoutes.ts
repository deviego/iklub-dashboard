import {
	AiOutlineHome,
} from "react-icons/ai";

import {
	RiRestaurant2Line,
	RiUserLine,
	RiUserFollowLine,
} from "react-icons/ri";
import { BiCoffee } from "react-icons/bi";
import strings from "../resources/strings";
import API from "~/resources/api";

const useMainRoutes = (currentUser: API.AdminUser | null) => {
	const isRestaurantAdminUser = !!currentUser?.restaurant;

	const commonRoutes = [
		{
			Icon: AiOutlineHome,
			text: strings.nav.home,
			path: "/dashboard",
		},
		{
			Icon: RiUserFollowLine,
			text: strings.nav.adminUsers,
			path: "/dashboard/adminUsers",
		},
		{
			Icon: RiUserFollowLine,
			text: strings.nav.adminRestaurantUsers,
			path: "/dashboard/adminRestaurantUsers",
		},
		{
			Icon: RiUserLine,
			text: strings.nav.users,
			path: "/dashboard/users",
		},
		{
			Icon: RiRestaurant2Line,
			text: strings.nav.restaurants,
			path: "/dashboard/restaurants",
		},
		isRestaurantAdminUser && (
			{
				Icon: BiCoffee,
				text: strings.nav.products,
				path: "/dashboard/products",
			}
		),
	];

	return commonRoutes;
};

export default useMainRoutes;
