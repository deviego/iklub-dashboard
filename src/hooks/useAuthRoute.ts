import { useEffect } from "react";
import { useHistory } from "react-router";
import api from "~/resources/api";
import { useGlobalStore } from "../contexts/useGlobalContext";

export const useAuthRoute = (onSuccess?: (currenAdminUser?: api.AdminUser) => void) => {
	const { authStore } = useGlobalStore();

	const history = useHistory();
	useEffect(() => {
		authStore.authenticate(onSuccess, () => history.replace("/login"));
	}, []);

	return authStore.loader.isLoading;
};
