import { LoaderShelf, FetchModelShelf } from "@startapp/mobx-utils";
import { makeAutoObservable } from "mobx";


import { Errors } from "~/resources/errors";
import { showErrorToast } from "~/resources/toast";
import api from "~/resources/api";

export default class Store{

	public loader = new LoaderShelf();
	public fetchModelShelf: FetchModelShelf<api.Consumption>;

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			api.getConsuption,
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
