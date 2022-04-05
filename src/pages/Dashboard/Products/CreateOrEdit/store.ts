import { FormShelf, ImagePickerShelf } from "@startapp/mobx-utils/src/web";
import { makeAutoObservable } from "mobx";
import { LoaderShelf, AttributeShelf } from "@startapp/mobx-utils";
import format from "../../../../resources/format";

import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";

const pageStrings = strings.products;

export default class Store {

	public formShelf = new FormShelf({
		title: "",
		description: "",
		price: "",
		totalNumberOfDoses: "",
	});
	public price = new AttributeShelf(0);
	public loader = new LoaderShelf();
	public imageShelf = new ImagePickerShelf(api.uploadImage);

	public get currency() {
		return format.currency(this.price.value);
	}

	public id = new AttributeShelf("");

	constructor(id?: string) {
		makeAutoObservable(this);

		if (id) {
			this.id.setValue(id);
			this.getProduct(id);
		}
	}

	public getProduct = async (id: string) => {
		this.loader.tryStart();
		try {
			const products = await api.getProductForRestaurantAdminUser(id);
			this.setInitValues(products);
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

	public setInitValues = (product: api.Product) => {
		this.formShelf = new FormShelf({
			title: product.title,
			description: product.description,
			price: product.price.toString(),
			totalNumberOfDoses: product.totalNumberOfDoses.toString(),
		});
		this.price.setValue(product.price);
		if (product.image) {
			this.imageShelf.getPickerFields().setUploadedImage(product.image);
		}
	};

	public createOrEditRestaurant = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {

			const data = this.formShelf.getValues();
			if (this.id.value) {

				await api.editProduct(this.id.value, {
					image: this.imageShelf.uncertainfiedImage,
					title: data.title,
					description: data.description,
					price: this.price.value,
					totalNumberOfDoses: Number(data.totalNumberOfDoses),
				});

			} else {
				await api.createProduct({
					image: this.imageShelf.uncertainfiedImage,
					title: data.title,
					description: data.description,
					price: this.price.value,
					totalNumberOfDoses: Number(data.totalNumberOfDoses),
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
