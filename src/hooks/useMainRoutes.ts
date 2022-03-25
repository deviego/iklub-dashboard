import {
	AiOutlineHome,
} from "react-icons/ai";

import { RiUserFollowLine } from "react-icons/ri";

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
	];

	return commonRoutes;
};

export default useMainRoutes;
