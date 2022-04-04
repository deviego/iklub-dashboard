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
		phone: "",
		zipcode: "",
		street: "",
		streetNumber: "",
		complementary: "",
		neighborhood: "",
		city: "",
		countryCode: "",
		state: api.StateUF.BA,
	});

	public loader = new LoaderShelf();
	public imageShelf = new ImagePickerShelf(api.uploadImage);

	public disableForm = new AttributeShelf(true);
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
			name: user.name,
			phone: user.phone,
			complementary: user.address.complementary || "",
			neighborhood: user.address.neighborhood,
			city: user.address.city,
			street: user.address.street,
			streetNumber: user.address.streetNumber,
			zipcode: user.address.zipcode,
			countryCode: user.address.countryCode,
			state: user.address.state,
		});
		if (user.image) {
			this.imageShelf.getPickerFields().setUploadedImage(user.image);
		}
		if (user.address){
			this.disableForm.setValue(false);
		}
	};

	public EditUser = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {
			const data = this.formShelf.getValues();
			const {
				email,
				name,
				phone,
			} = data;

			if (this.id.value) {
				await api.editUser(this.id.value, {
					image: this.imageShelf.uncertainfiedImage,
					email,
					name,
					phone,
					birthdate: null,
					address: {
						neighborhood: data.neighborhood,
						city: data.city,
						state: this.stateUF.value,
						street: data.street,
						streetNumber: data.streetNumber,
						complementary: data.complementary,
						zipcode: data.zipcode,
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
