import {
	LoaderShelf,
	AbstractPaginatedListStore,
	AttributeShelf,
} from "@startapp/mobx-utils";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";
import api from "~/resources/api";

export default class Store extends AbstractPaginatedListStore<api.Restaurant> {

	public loader = new LoaderShelf();
	public totalRestaurants = new AttributeShelf(0);

	constructor() {
		super();
		this.fetchPage(0);
	}

	protected getDataItemsPerPage(page: number): Promise<api.Restaurant[]> {
		return api.getAllRestaurants(page);
	}

	public deleteRestaurant = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedRestaurant = await api.deleteRestaurant(id);

			showSuccessToast(strings.users.table.delete(deletedRestaurant.name));
			this.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
