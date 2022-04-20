import { AttributeShelf, PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { showErrorToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";

export default class Store {

	public documentNumber = new AttributeShelf<string>("");
	public paginetedListShelf: PaginatedListShelf<api.PurchasedProduct>;

	constructor() {
		makeAutoObservable(this);

		this.paginetedListShelf = new PaginatedListShelf(
			(page) => api.getAllPurchasedProductsByUserFilterOptionsForRestaurantAdminUser(page, this.userFindOptions),
			{
				fetchOnConstructor: true,
				onFetchError: (e) => {
					const error = Errors.treatError(e);
					showErrorToast(error.message);
				},
			},
		);
	}

	public get userFindOptions() {
		return {
			name: null,
			documentNumber: this.documentNumber.value,
		};
	}

}
