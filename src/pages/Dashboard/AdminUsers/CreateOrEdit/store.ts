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

	public id = new AttributeShelf("");

	constructor(id: string) {
		makeAutoObservable(this);

		this.id.setValue(id);
		this.getAdminUser(id);
	}

	public getAdminUser = async (id: string) => {
		this.loader.tryStart();
		try {
			const adminUser = await api.getAdminUser(id);
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

			if (this.id.value){
				await api.editAdminUser(this.id.value,{
					email,
					name,
				});
			} else {
				await api.createAdminUser({
					email,
					name,
					password,
				});
			}

			showSuccessToast(pageStrings.success(!!this.id.value));
			onSuccess();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
