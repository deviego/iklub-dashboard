import { FormShelf, ImagePickerShelf } from "@startapp/mobx-utils/src/web";
import { makeAutoObservable } from "mobx";
import { LoaderShelf, AttributeShelf } from "@startapp/mobx-utils";

import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";

const pageStrings = strings.restaurants.createOrEdit;

export default class Store {

	public formShelf = new FormShelf({
		name: "",
		corporateName: "",
		documentNumber: "",
		zipcode: "",
		street: "",
		streetNumber: "",
		complementary: "",
		neighborhood: "",
		city: "",
		countryCode: "",
		state: api.StateUF.BA,
	});

	public stateUF = new AttributeShelf(api.StateUF.BA);
	public loader = new LoaderShelf();
	public imageShelf = new ImagePickerShelf(api.uploadImage);

	public id = new AttributeShelf("");

	constructor(id?: string) {
		makeAutoObservable(this);

		if (id) {
			this.id.setValue(id);
			this.getRestaurant(id);
		}
	}

	public setStateEnum = async (stateGooglePlace: string) => {
		const allStateEnum = api.allValuesStateUF();
		const stateFiltered = allStateEnum.find((state: api.StateUF) => state === stateGooglePlace);
		this.stateUF.setValue(stateFiltered || api.StateUF.BA);
	};

	public getRestaurant = async (id: string) => {
		this.loader.tryStart();
		try {
			const restaurant = await api.getRestaurantById(id);
			this.setInitValues(restaurant);
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

	public setInitValues = (restaurant: api.Restaurant) => {
		this.formShelf = new FormShelf({
			name: restaurant.name,
			corporateName: restaurant.corporateName,
			documentNumber: restaurant.documentNumber,
			complementary: restaurant.address.complementary || "",
			neighborhood: restaurant.address.neighborhood,
			city: restaurant.address.city,
			street: restaurant.address.street,
			streetNumber: restaurant.address.streetNumber,
			zipcode: restaurant.address.zipcode,
			countryCode: restaurant.address.countryCode,
			state: restaurant.address.state,
		});
	};

	public createOrEditRestaurant = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {

			const data = this.formShelf.getValues();
			if (this.id.value) {

				await api.editRestaurant(this.id.value, {
					name: data.name,
					documentNumber: data.documentNumber,
					corporateName: data.corporateName,
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
					image: this.imageShelf.uncertainfiedImage,
				});
			} else {
				await api.createRestaurant({
					name: data.name,
					documentNumber: data.documentNumber,
					corporateName: data.corporateName,
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
					image: this.imageShelf.uncertainfiedImage,
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
