import {
	AiOutlineHome,
} from "react-icons/ai";

import { RiUserFollowLine } from "react-icons/ri";

import {
	RiRestaurant2Line,
	RiUserLine,
} from "react-icons/ri";
import { BiCoffee } from "react-icons/bi";
import strings from "../resources/strings";


const useMainRoutes = () => {
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
			Icon: RiUserLine,
			text: strings.nav.users,
			path: "/dashboard/users",
		},
		{
			Icon: RiRestaurant2Line,
			text: strings.nav.restaurants,
			path: "/dashboard/restaurants",
		},
		{
			Icon: BiCoffee,
			text: strings.nav.products,
			path: "/dashboard/products",
		},
	];

	return commonRoutes;
};

export default useMainRoutes;
