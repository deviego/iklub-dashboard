import { useEffect } from "react";
import { useHistory } from "react-router";
import { useGlobalStore } from "../contexts/useGlobalContext";

export const useAuthRoute = (onSuccess?: () => void) => {
	const { authStore } = useGlobalStore();
	const history = useHistory();
	useEffect(() => {
		authStore.authenticate(onSuccess, () => history.replace("/login"));
	}, []);

	return authStore.loader.isLoading;
};
