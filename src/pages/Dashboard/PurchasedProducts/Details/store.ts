import { makeAutoObservable } from "mobx";
import { FetchModelShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";

import { Errors } from "~/resources/errors";
import { showErrorToast } from "~/resources/toast";

export default class Store {

	public fetchModelShelf: FetchModelShelf<api.PurchasedProduct>;

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			api.getPurchasedProduct,
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
