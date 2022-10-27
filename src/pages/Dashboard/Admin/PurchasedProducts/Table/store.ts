import { PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { showErrorToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";

export default class Store {
	public paginetedListShelf: PaginatedListShelf<api.PurchasedProduct>;

	constructor() {
		makeAutoObservable(this);
		this.paginetedListShelf = new PaginatedListShelf(
			(page) => api.getAllPurchasedProducts(page + 1),
			{
				fetchOnConstructor: true,
				onFetchError: (e) => {
					const error = Errors.treatError(e);
					showErrorToast(error.message);
				},
			},
		);
	}
}
