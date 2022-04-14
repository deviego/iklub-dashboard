import { makeAutoObservable, reaction } from "mobx";
import { LoaderShelf, AttributeShelf, PaginatedListShelf } from "@startapp/mobx-utils";
import { FormShelf } from "@startapp/mobx-utils/src/web";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";

const pageStrings = strings.adminUsers.createOrEdit;

export default class Store {

	public formShelf = new FormShelf({
		email: "",
		name: "",
		password: "",
	});

	public loader = new LoaderShelf();
	public searchRestaurant = new AttributeShelf("");
	public restaurant: AttributeShelf<api.Restaurant | null> = new AttributeShelf(null);
	public restaurantId = new AttributeShelf("");
	public userId = new AttributeShelf("");

	private autoCompleteReaction = reaction(() => this.searchRestaurant.value,
		() => this.autoCompleteRestaurant.refresh(),
	);

	public autoCompleteRestaurant = new PaginatedListShelf(
		async (page: number) => await api.autocompleteRestaurant(this.searchRestaurant.value, page),
		{
			onAfterFetch: () => {},
		},
	);

	public dispose = () => {
		this.autoCompleteReaction();
	};

	constructor(restaurantId?: string, id?: string) {
		makeAutoObservable(this);

		if (restaurantId) {
			this.restaurantId.setValue(restaurantId);
		}
		if (id) {
			this.getAdminRestaurantUser(id);
		}
	}

	public getAdminRestaurantUser = async (id: string) => {
		this.loader.tryStart();
		try {
			const adminrRestaurantUser = await api.getAdminRestaurantUser(id);
			this.userId.setValue(adminrRestaurantUser.id);
			this.setInitValues(adminrRestaurantUser);
		} catch (e) {
			Errors.handleError(e);
		} finally {
			this.loader.end();
		}
	};

	public setInitValues = (adminRestaurantUser: api.AdminUser) => {
		this.formShelf = new FormShelf({
			email: adminRestaurantUser.email,
			name: adminRestaurantUser.name,
			password: "",
		});
		this.restaurant.setValue(adminRestaurantUser.restaurant);
	};

	public createOrEditAdminRestaurantUser = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {
			const data = this.formShelf.getValues();
			const {
				email,
				name,
				password,
			} = data;

			if (this.userId.value !== ""){
				await api.editAdminUser(this.userId.value,{
					email,
					name,
				});
			} else {
				await api.createAdminUser({
					email,
					name,
					password,
					restaurantId: this.restaurantId.value !== "" ? this.restaurantId.value : this.restaurant.value ? this.restaurant.value.id : null,
				});
			}

			showSuccessToast(pageStrings.success(!!this.userId));
			onSuccess();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
