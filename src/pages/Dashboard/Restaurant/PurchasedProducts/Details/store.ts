import { makeAutoObservable } from "mobx";
import { AttributeShelf, FetchModelShelf, LoaderShelf, PaginatedListShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";
import strings from "~/resources/strings";

import { Errors } from "~/resources/errors";
import { showErrorToast, showSuccessToast } from "~/resources/toast";

export default class Store {

	public fetchModelShelf: FetchModelShelf<api.PurchasedProduct>;
	public paginetedListShelf: PaginatedListShelf<api.Consumption>;
	public isConsumeModalOpen = new AttributeShelf(false);
	public consumeQuantity = new AttributeShelf(1);
	public purchasedProductId = new AttributeShelf("");
	public loader = new LoaderShelf();

	constructor(id: string) {
		makeAutoObservable(this);
		this.purchasedProductId.setValue(id);
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
			await api.createConsumptionForRestaurantAdminUser(
				this.purchasedProductId.value,
				this.consumeQuantity.value,
			);
			this.fetchModelShelf.fetchModel();
			this.paginetedListShelf.refresh();
			showSuccessToast(strings.purchasedProducts.details.successMessage(this.consumeQuantity.value));
		} catch (e) {
			const error = Errors.treatError(e);
			showErrorToast(error.message);
		} finally {
			this.loader.end();
		}

	};
}
