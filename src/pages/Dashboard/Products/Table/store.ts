import {
	LoaderShelf,
	AttributeShelf,
	PaginatedListShelf,
} from "@startapp/mobx-utils";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";
import api from "~/resources/api";
import { makeAutoObservable } from "mobx";

export default class Store {

	public paginetedListShelf: PaginatedListShelf<api.Product> = new PaginatedListShelf(
		api.getAllProducts,
		{
			fetchOnConstructor: true,
			onFetchError: (e) => {
				const error = Errors.treatError(e);
				showErrorToast(error.message);
			},
		},
	);

	public loader = new LoaderShelf();
	public totalRestaurants = new AttributeShelf(0);

	constructor() {
		makeAutoObservable(this);
	}

	public deleteProduct = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedProduct = await api.deleteProduct(id);

			showSuccessToast(strings.users.table.delete(deletedProduct.title));
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

	public changeProductDisableStatus = async (id: string, disableAt: Date | null) => {
		this.loader.tryStart();
		try {

			const disableOrEnable = disableAt ? false : true;
			await api.changeProductDisableStatus(id, disableOrEnable);

			showSuccessToast(strings.products.table.statusDisable(disableOrEnable));
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
