import {
	LoaderShelf,
	AttributeShelf,
	PaginatedListShelf,
} from "@startapp/mobx-utils";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";
import api from "~/resources/api";
import { makeAutoObservable } from "mobx";

export default class Store {

	public paginetedListShelf: PaginatedListShelf<api.Restaurant> = new PaginatedListShelf(
		api.getAllRestaurants,
		{
			fetchOnConstructor: true,
		},
	);

	public loader = new LoaderShelf();
	public totalRestaurants = new AttributeShelf(0);

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
}
