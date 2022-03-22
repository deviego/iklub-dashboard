import {
	AiOutlineHome,
} from "react-icons/ai";

import strings from "../resources/strings";

const useMainRoutes = () => {
	const commonRoutes = [
		{
			Icon: AiOutlineHome,
			text: strings.nav.home,
			path: "/dashboard",
		},
	];

	return commonRoutes;
};

export default useMainRoutes;
