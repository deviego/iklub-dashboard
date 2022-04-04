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

	public paginetedListShelf: PaginatedListShelf<api.AdminUser> = new PaginatedListShelf(
		api.getAllAdminRestaurantUsers,
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

	public deleteAdminRestaurantUser = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedAdminUser = await api.deleteAdminUser(id);

			showSuccessToast(strings.users.table.delete(deletedAdminUser.name));
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
