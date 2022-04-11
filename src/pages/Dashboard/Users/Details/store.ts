import { makeAutoObservable } from "mobx";
import { FetchModelShelf, PaginatedListShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";
import { Errors } from "~/resources/errors";
import { showErrorToast } from "~/resources/toast";

export default class Store {

	public fetchModelShelf: FetchModelShelf<api.User>;

	public paginetedListShelf: PaginatedListShelf<api.PurchasedProductWithoutUser	>;

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			(idUser) => api.getUser(idUser),
			{
				fetchOnConstructor: true,
			},
		);

		this.paginetedListShelf = new PaginatedListShelf(
			(page) => api.getAllPurchasedProductsByUser(page, id),
			{
				fetchOnConstructor: true,
				onFetchError: this.onFetchError,
			},
		);
	}

	private onFetchError = (e: any) => {
		const error = Errors.treatError(e);
		showErrorToast(error.message);
	};
}
