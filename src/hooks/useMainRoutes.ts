import {
	AiOutlineHome,
} from "react-icons/ai";

import {
	RiRestaurant2Line,
	RiUserLine,
} from "react-icons/ri";
import strings from "../resources/strings";


const useMainRoutes = () => {
	const commonRoutes = [
		{
			Icon: AiOutlineHome,
			text: strings.nav.home,
			path: "/dashboard",
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
	];

	return commonRoutes;
};

export default useMainRoutes;
