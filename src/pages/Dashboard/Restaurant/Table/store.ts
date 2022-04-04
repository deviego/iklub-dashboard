import {
	LoaderShelf,
	PaginatedListShelf,
} from "@startapp/mobx-utils";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";
import api from "~/resources/api";
import { makeAutoObservable } from "mobx";

export default class Store {

	// FIX-ME: Agora metodo pede data como parametro;

	public paginetedListShelf: PaginatedListShelf<api.AdminUser> = new PaginatedListShelf(
		api.getAllAdminUsers,
		{
			fetchOnConstructor: true,
			onFetchError: (e) => {
				const error = Errors.treatError(e);
				showErrorToast(error.message);
			},
		},
	);

	public loader = new LoaderShelf();

	constructor() {
		makeAutoObservable(this);
	}

	public deleteRestaurant = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedRestaurant = await api.deleteRestaurant(id);

			showSuccessToast(strings.users.table.delete(deletedRestaurant.name));
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

	public changeRestaurantBlockStatus = async (id: string, blockedAt: Date | null) => {
		this.loader.tryStart();
		try {
			if (blockedAt) {
				await api.changeRestaurantBlockStatus(id, false);
				showSuccessToast(strings.restaurants.table.statusRestaurant(false));
			} else {
				await api.changeRestaurantBlockStatus(id, true);
				showSuccessToast(strings.restaurants.table.statusRestaurant(true));
			}
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
