import React from "react";
import { observer } from "mobx-react-lite";
import {
	Text,
} from "@chakra-ui/react";

import { useGlobalStore } from "~/contexts/useGlobalContext";

import strings from "~/resources/strings";

const Home: React.FC = () => {
	const { authStore } = useGlobalStore();
	const pageStrings = strings.home;

	return (
		<>
			{
				authStore.currentAdminUser &&
					<Text fontSize="lg" fontWeight="bold" marginTop={5} textAlign="center" p={4}>
						{
							pageStrings.message(authStore.currentAdminUser.name)
						}
					</Text>
			}
		</>
	);
};

export default observer(Home);
