import { makeAutoObservable } from "mobx";
import { LoaderShelf, AttributeShelf } from "@startapp/mobx-utils";
import { FormShelf, ImagePickerShelf } from "@startapp/mobx-utils/src/web";

import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";

const pageStrings = strings.users.edit;

export default class Store {

	public formShelf = new FormShelf({
		email: "",
		name: "",
		documentNumber: "",
		phone: "",
	});

	public formAddressShelf = new FormShelf({
		zipcode: "",
		street: "",
		streetNumber: "",
		complementary: "",
		neighborhood: "",
		city: "",
		countryCode: "",
		state: "",
	});

	public loader = new LoaderShelf();
	public imageShelf = new ImagePickerShelf(api.uploadImage);

	public stateUF = new AttributeShelf(api.StateUF.BA);

	public id = new AttributeShelf("");
	public user: api.User;

	constructor(id?: string) {
		makeAutoObservable(this);

		if (id) {
			this.id.setValue(id);
			this.getUser(id);
		}
	}

	public getUser = async (id: string) => {
		this.loader.tryStart();
		try {
			this.user = await api.getUser(id);
			this.setInitValues(this.user);
		} catch (e) {
			Errors.handleError(e);
		} finally {
			this.loader.end();
		}
	};

	public setInitValues = (user: api.User) => {
		this.formShelf = new FormShelf({
			email: user.email,
			documentNumber: user.documentNumber || "",
			name: user.name,
			phone: user.phone,
		});

		if (user.image) {
			this.imageShelf.getPickerFields().setUploadedImage(user.image);
		}
		if (user.address) {
			this.formAddressShelf = new FormShelf({
				complementary: user.address.complementary || "",
				neighborhood: user.address.neighborhood,
				city: user.address.city,
				street: user.address.street,
				streetNumber: user.address.streetNumber,
				zipcode: user.address.zipcode,
				countryCode: user.address.countryCode,
				state: "",
			});
		}

		if (user.address) {
			this.stateUF.setValue(user.address.state);
		}
	};

	public editUser = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {
			const data = this.formShelf.getValues();
			const dataAddress = this.formAddressShelf.getValues();
			const {
				email,
				name,
				documentNumber,
				phone,
			} = data;

			const {
				neighborhood,
				city,
				street,
				streetNumber,
				complementary,
				zipcode,
			} = dataAddress;

			if (this.id.value) {
				await api.editUser(this.id.value, {
					image: this.imageShelf.uncertainfiedImage,
					email,
					name,
					documentNumber: documentNumber || null,
					phone,
					birthdate: null,
					address: {
						neighborhood,
						city,
						state: this.stateUF.value,
						street,
						streetNumber,
						complementary,
						zipcode,
						countryCode: "BR",
					},
				});
			}
			showSuccessToast(pageStrings.success);
			onSuccess();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

}
