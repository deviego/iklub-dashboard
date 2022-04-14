import { makeAutoObservable } from "mobx";
import { FetchModelShelf, PaginatedListShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";

import { Errors } from "~/resources/errors";
import { showErrorToast } from "~/resources/toast";

export default class Store {

	public fetchModelShelf: FetchModelShelf<api.PurchasedProduct>;
	public paginetedListShelf: PaginatedListShelf<api.Consumption>;

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			api.getPurchasedProductForRestaurantAdminUser,
			{
				fetchOnConstructor: true,
				onFetchError: (e) => {
					const error = Errors.treatError(e);
					showErrorToast(error.message);
				},
			},
		);

		this.paginetedListShelf = new PaginatedListShelf(
			() => api.getConsumptionHistoryByPurchasedProduct(id),
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
