import { useEffect } from "react";
import { useHistory } from "react-router";
import strings from "~/resources/strings";
import { showInfoToast } from "~/resources/toast";
import { useGlobalStore } from "../contexts/useGlobalContext";

export const useAuthAdminRoute = (onSuccess?: () => void) => {
	const { authStore } = useGlobalStore();
	const history = useHistory();
	useEffect(() => {
		if (!authStore.loader.isLoading && authStore.currentAdminUser) {
			if (authStore.currentAdminUser.restaurant) {
				history.replace("/dashboard/restaurant");
				showInfoToast(strings.error.currentUserIsNotSuperAdmin);
			}

			if (onSuccess) {
				onSuccess();
			}
		}
	}, [authStore.loader.isLoading, authStore.currentAdminUser]);

	return authStore.loader.isLoading;
};
