import { makeAutoObservable } from "mobx";
import { AttributeShelf, FetchModelShelf, LoaderShelf, PaginatedListShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";

import { Errors } from "~/resources/errors";
import { showErrorToast } from "~/resources/toast";

export default class Store {

	public fetchModelShelf: FetchModelShelf<api.PurchasedProduct>;
	public paginetedListShelf: PaginatedListShelf<api.Consumption>;
	public isConsumeModalOpen = new AttributeShelf(false);
	public consumeQuantity = new AttributeShelf(1);
	public loader = new LoaderShelf();

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

	public onConsumePurchasedProduct = async () => {
		this.loader.tryStart();
		try {
			// await api.consumeDoses();
		} catch (e) {
			const error = Errors.treatError(e);
			showErrorToast(error.message);
		} finally {
			this.loader.end();
		}

	};
}
