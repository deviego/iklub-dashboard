import { makeAutoObservable } from "mobx";
import { LoaderShelf, AttributeShelf } from "@startapp/mobx-utils";
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

	public blocked = new AttributeShelf(false);
	public loader = new LoaderShelf();

	public userId = new AttributeShelf("");
	public restaurantId = new AttributeShelf("");

	constructor(restaurantId: string, userId?: string) {
		makeAutoObservable(this);
		this.restaurantId.setValue(restaurantId);
		if (userId) {
			this.userId.setValue(userId);
			this.getAdminUser(userId);
		}
	}

	public getAdminUser = async (id: string) => {
		this.loader.tryStart();
		try {
			const adminUser = await api.getAdminRestaurantUser(id);
			this.setInitValues(adminUser);
		} catch (e) {
			Errors.handleError(e);
		} finally {
			this.loader.end();
		}
	};

	public setInitValues = (adminUser: api.EditAdminUser) => {
		this.formShelf = new FormShelf({
			email: adminUser.email,
			name: adminUser.name,
			password: "",
		});
	};

	public createOrEditUser = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {
			const data = this.formShelf.getValues();
			const {
				email,
				name,
				password,
			} = data;

			if (this.userId.value) {
				await api.editAdminUser(this.userId.value, {
					email,
					name,
				});
			} else {
				await api.createAdminUser({
					email,
					name,
					password,
					restaurantId: this.restaurantId.value,
				});
			}

			showSuccessToast(pageStrings.success(!!this.userId.value));
			onSuccess();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
