import {
	LoaderShelf,
	PaginatedListShelf,
	AttributeShelf,
} from "@startapp/mobx-utils";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";
import api from "~/resources/api";
import { makeAutoObservable } from "mobx";
import API from "~/resources/api";

export default class Store {

	public loader = new LoaderShelf();
	public dateFilter = new AttributeShelf<Date | null>(null);
	public getAllRestaurants = async (pageOffSet: number): Promise<API.Restaurant[]> => {
		const restaurants = await api.getAllRestaurants(pageOffSet, this.dateFilter.value);
		return restaurants;
	};

	public paginetedListShelf: PaginatedListShelf<api.Restaurant> = new PaginatedListShelf(
		this.getAllRestaurants,
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

	public onChangeDateFilter = (newDate: Date) => {
		this.dateFilter.setValue(newDate);
		this.paginetedListShelf.refresh();
	};


	public deleteRestaurant = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedRestaurant = await api.deleteRestaurant(id);

			showSuccessToast(strings.users.table.delete(deletedRestaurant.name));
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

	public changeRestaurantBlockStatus = async (id: string, blockedAt: Date | null) => {
		this.loader.tryStart();
		try {
			if (blockedAt) {
				await api.changeRestaurantBlockStatus(id, false);
				showSuccessToast(strings.restaurants.table.statusRestaurant(false));
			} else {
				await api.changeRestaurantBlockStatus(id, true);
				showSuccessToast(strings.restaurants.table.statusRestaurant(true));
			}
			this.paginetedListShelf.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
