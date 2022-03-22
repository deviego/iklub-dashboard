import React, { useEffect } from "react";
import { useGlobalStore } from "../../contexts/useGlobalContext";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import { CircularProgress, Flex } from "@chakra-ui/react";

export const Auth = observer(() => {
	const { authStore } = useGlobalStore();
	const history = useHistory();

	useEffect(() => {
		history.replace("/dashboard");
		authStore.authenticate(
			() => history.replace("/dashboard"),
			() => history.replace("/login"),
		);
	}, []);

	return (
		<Flex justifyContent="center">
			<CircularProgress
				isIndeterminate
				color="primary"
				size="100px"
				thickness="4px"
			/>
		</Flex>
	);
});
