import { PaginatedListShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";
import { showErrorToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";

export default class Store {

	public paginetedListShelf: PaginatedListShelf<api.Consumption>;

	constructor(purchasedProductId: string) {
		this.paginetedListShelf = new PaginatedListShelf(
			() => api.getConsumptionHistoryByPurchasedProduct(purchasedProductId),
			{
				fetchOnConstructor: true,
				onFetchError: (e) => {
					const error = Errors.treatError(e);
					showErrorToast(error.message);
				},
			},
		);
		makeAutoObservable(this);
	}
}
