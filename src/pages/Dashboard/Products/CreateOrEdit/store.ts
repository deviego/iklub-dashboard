import { FormShelf, ImagePickerShelf } from "@startapp/mobx-utils/src/web";
import { makeAutoObservable, reaction } from "mobx";
import { LoaderShelf, AttributeShelf, PaginatedListShelf } from "@startapp/mobx-utils";
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

	public searchRestaurant = new AttributeShelf("");

	public autoCompleteRestaurant = new PaginatedListShelf(
		async (page: number) => await api.autocompleteRestaurant(this.searchRestaurant.value, page),
	);

	private autoCompleteReaction = reaction(() => this.searchRestaurant.value,
		() => this.autoCompleteRestaurant.refresh(),
	);

	public dispose = () => {
		this.autoCompleteReaction();
	};

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
			const products = await api.getProduct(id);
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

	public createNewProductObject = (): api.NewProduct => {

		const data = this.formShelf.getValues();

		return ({
			image: this.imageShelf.uncertainfiedImage,
			title: data.title,
			description: data.description,
			price: this.price.value,
			totalNumberOfDoses: Number(data.totalNumberOfDoses),
		});
	};

	public createOrEditRestaurant = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {

			if (this.id.value) {
				await api.editProduct(this.id.value, this.createNewProductObject());

			} else {
				await api.createProduct(this.createNewProductObject(), "9f1f52b7-7968-4a39-b4f0-a8aa387e0dec");
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
