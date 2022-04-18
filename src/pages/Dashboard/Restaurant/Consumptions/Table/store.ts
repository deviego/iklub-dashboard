import { makeAutoObservable } from "mobx";
import { PaginatedListShelf, LoaderShelf } from "@startapp/mobx-utils";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import strings from "~/resources/strings";

export default class Store {

	public loader = new LoaderShelf();

	public pendingConsumptionsListShelf: PaginatedListShelf<api.Consumption> = new PaginatedListShelf(
		api.getAllPendingConsumptionsForRestaurantAdmin,
		{
			fetchOnConstructor: true,
			onFetchError: (e) => {
				const error = Errors.treatError(e);
				showErrorToast(error.message);
			},
		},
	);

	public consumptionsListShelf: PaginatedListShelf<api.Consumption> = new PaginatedListShelf(
		api.getAllAcceptedConsumptionsForRestaurantAdmin,
		{
			fetchOnConstructor: true,
			onFetchError: (e) => {
				const error = Errors.treatError(e);
				showErrorToast(error.message);
			},
		},
	);

	constructor() {
		makeAutoObservable(this);
	}

	public deleteConsumptionRequest = async (id: string) => {
		this.loader.tryStart();
		try {

			await api.deleteConsumption(id);

			showSuccessToast(strings.consumptions.pendingTable.successDelete);
			this.pendingConsumptionsListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

	public approveConsumptionRequest = async (id: string) => {
		this.loader.tryStart();
		try {

			await api.approveConsumption(id);

			this.pendingConsumptionsListShelf.refresh();
			this.consumptionsListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
