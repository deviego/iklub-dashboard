import { PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { showErrorToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";

export default class Store {

	public paginetedListShelf: PaginatedListShelf<api.PurchasedProduct> = new PaginatedListShelf(
		api.getAllPurchasedProductsForRestaurantAdminUser,
		{
			fetchOnConstructor: true,
			onFetchError: (e) => {
				const error = Errors.treatError(e);
				showErrorToast(error.message);
			},
		},
	);

	constructor() {
		makeAutoObservable(this);
	}
}
