import { makeAutoObservable } from "mobx";
import { LoaderShelf, AttributeShelf, FetchModelShelf } from "@startapp/mobx-utils";
import { FormShelf, ImagePickerShelf } from "@startapp/mobx-utils/src/web";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";


const pageStrings = strings.restaurants.createOrEdit;

export default class Store {

	public formShelf = new FormShelf({
		name: "",
		corporateName: "",
		zipcode: "",
		street: "",
		streetNumber: "",
		complementary: "",
		neighborhood: "",
		city: "",
		countryCode: "",

	});

	public formShelfBankAccount = new FormShelf({
		bankCode: "",
		agency: "",
		agencyDv: "",
		account: "",
		accountDv: "",
		documentNumber: "",
	});

	public type = new AttributeShelf(api.BankAccountType.contaCorrente);
	public stateUF = new AttributeShelf(api.StateUF.AC);
	public loader = new LoaderShelf();
	public imageShelf = new ImagePickerShelf(api.uploadImage);

	public id = new AttributeShelf("");

	public fetchModelShelf: FetchModelShelf<api.AdminUser>;

	constructor(id: string) {
		makeAutoObservable(this);
		this.id.setValue(id);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			api.getAdminRestaurantUser,
			{
				fetchOnConstructor: true,
				onAfterFetch: this.onAfterFetch,
			},
		);
	}

	public onAfterFetch = (adminUser: api.AdminUser) => {
		this.formShelf = new FormShelf({
			name: adminUser.restaurant?.name || "",
			corporateName: adminUser.restaurant?.corporateName || "",
			complementary: adminUser.restaurant?.address.complementary || "" || "",
			neighborhood: adminUser.restaurant?.address.neighborhood || "",
			city: adminUser.restaurant?.address.city || "",
			street: adminUser.restaurant?.address.street || "",
			streetNumber: adminUser.restaurant?.address.streetNumber || "",
			zipcode: adminUser.restaurant?.address.zipcode || "",
			countryCode: adminUser.restaurant?.address.countryCode || "",
		});
		if (adminUser.restaurant?.image) {
			this.imageShelf.getPickerFields().setUploadedImage(adminUser.restaurant.image);
		}
		if (adminUser.restaurant?.address){
			this.stateUF.setValue(adminUser.restaurant.address.state);
		}
		if (adminUser.restaurant.bankAccount) {
			this.formShelfBankAccount = new FormShelf({
				account: adminUser.restaurant.bankAccount?.account,
				accountDv: adminUser.restaurant.bankAccount?.accountDv || "",
				agency: adminUser.restaurant.bankAccount?.agency,
				agencyDv: adminUser.restaurant.bankAccount?.agencyDv || "",
				bankCode: adminUser.restaurant.bankAccount?.bankCode,
				documentNumber: adminUser.restaurant.bankAccount.documentNumber,
			});
			this.type.setValue(adminUser.restaurant.bankAccount.type);
		}

	};

	public createOrEditBanKAccount = async () => {
		this.loader.tryStart();
		try {

			const dataBankAccount = this.formShelfBankAccount.getValues();
			await api.createOrEditBankAccountForRestaurantAdminUser({
				account: dataBankAccount.account,
				accountDv: dataBankAccount.accountDv,
				agency: dataBankAccount.agency,
				agencyDv: dataBankAccount.agencyDv,
				bankCode: dataBankAccount.bankCode,
				type: this.type.value,
				documentNumber: dataBankAccount.documentNumber,
			});
			showSuccessToast(pageStrings.successBankAccount(!!dataBankAccount.account));

		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};


	public EditMyRestaurant = async (onSuccess: () => void) => {
		this.loader.tryStart();
		try {

			const data = this.formShelf.getValues();
			await api.editRestaurantOfRestaurantAdminUser({
				image: this.imageShelf.uncertainfiedImage,
				name: data.name,
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
			});

			showSuccessToast(pageStrings.success(!this.id.value));
			onSuccess();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
