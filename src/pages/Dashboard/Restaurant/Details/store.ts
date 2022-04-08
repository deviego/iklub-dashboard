import { LoaderShelf, FetchModelShelf, PaginatedListShelf } from "@startapp/mobx-utils";
import api from "~/resources/api";
import { makeAutoObservable } from "mobx";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";

export default class Store{

	public loader = new LoaderShelf();
	public fetchModelShelf: FetchModelShelf<api.Restaurant>;
	public id: string;

	public paginetedListShelf: PaginatedListShelf<api.Product> | null = null;

	constructor(id: string) {
		makeAutoObservable(this);
		this.id = id;

		this.paginetedListShelf = new PaginatedListShelf(
			(page) => api.getAllProductsByRestaurant(page, this.id),
			{
				onFetchError: this.onFecthError,
			},
		);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			api.getRestaurantById,
			{
				fetchOnConstructor: true,
				onAfterFetch: () => {
					if (this.paginetedListShelf) {
						this.paginetedListShelf.fetchPage(0);
					}
				},
				onFetchError: this.onFecthError,
			},
		);

	}

	private onFecthError = (e: any) => {
		const error = Errors.treatError(e);
		showErrorToast(error.message);
	};

	public deleteProduct = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedProduct = await api.deleteProduct(id);

			showSuccessToast(strings.users.table.delete(deletedProduct.title));
			this.paginetedListShelf?.refresh();
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
			this.paginetedListShelf?.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
