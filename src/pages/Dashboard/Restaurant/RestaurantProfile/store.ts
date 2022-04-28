import { makeAutoObservable } from "mobx";
import { LoaderShelf, AttributeShelf, FetchModelShelf } from "@startapp/mobx-utils";
import { FormShelf, ImagePickerShelf } from "@startapp/mobx-utils/src/web";
import { Errors } from "~/resources/errors";
import api from "~/resources/api";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";

export interface IBankNameAndCode {
	name: string;
	code: string;
}

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
		bankName: "",
		bankCode: "",
		agency: "",
		agencyDv: "",
		account: "",
		accountDv: "",
		documentNumber: "",
	});

	public type = new AttributeShelf<api.BankAccountType>(api.BankAccountType.contaCorrente);
	public stateUF = new AttributeShelf(api.StateUF.AC);
	public loader = new LoaderShelf();
	public fetchModelShelf: FetchModelShelf<api.AdminUser>;
	public imageShelf = new ImagePickerShelf(api.uploadImage);
	public isEditBankAccount = new AttributeShelf(false);
	public id = new AttributeShelf("");
	public selectedBankAccountType: api.BankAccountType | null = null;

	public bankCode = "";
	public bankName = "";

	public selectBankAccountType = (bankAccountType: api.BankAccountType) => {
		this.selectedBankAccountType = bankAccountType;
	};

	public getBankNamesAndCodes = (): IBankNameAndCode[] => [
		{
			name: strings.restaurants.createOrEdit.banksCode.code1.name,
			code: strings.restaurants.createOrEdit.banksCode.code1.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code2.name,
			code: strings.restaurants.createOrEdit.banksCode.code2.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code3.name,
			code: strings.restaurants.createOrEdit.banksCode.code3.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code4.name,
			code: strings.restaurants.createOrEdit.banksCode.code4.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code5.name,
			code: strings.restaurants.createOrEdit.banksCode.code5.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code6.name,
			code: strings.restaurants.createOrEdit.banksCode.code6.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code7.name,
			code: strings.restaurants.createOrEdit.banksCode.code7.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code8.name,
			code: strings.restaurants.createOrEdit.banksCode.code8.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code9.name,
			code: strings.restaurants.createOrEdit.banksCode.code9.code,
		},
		{
			name: strings.restaurants.createOrEdit.banksCode.code10.name,
			code: strings.restaurants.createOrEdit.banksCode.code10.code,
		},
	];

	public toggleBank = (bankCode: string) => {
		const bankNameAndCode = this.getBankNamesAndCodes().find((bank) => bank.code === bankCode);
		if (bankNameAndCode) {
			this.bankName = bankNameAndCode.name;
			this.bankCode = bankNameAndCode.code;
		}
	};

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
		if (adminUser.restaurant?.bankAccount) {
			this.formShelfBankAccount = new FormShelf({
				bankName: adminUser.restaurant.bankAccount.bankName,
				account: adminUser.restaurant.bankAccount.account,
				accountDv: adminUser.restaurant.bankAccount.accountDv || "",
				agency: adminUser.restaurant.bankAccount.agency,
				agencyDv: adminUser.restaurant.bankAccount.agencyDv || "",
				bankCode: adminUser.restaurant.bankAccount.bankCode,
				documentNumber: adminUser.restaurant.bankAccount.documentNumber,
			});
			this.type.setValue(adminUser.restaurant.bankAccount.type);
			this.isEditBankAccount.setValue(true);
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
				bankCode: this.bankCode,
				type: this.type.value,
				documentNumber: dataBankAccount.documentNumber,
				bankName: this.bankName,
			});
			showSuccessToast(pageStrings.successBankAccount(this.isEditBankAccount.value));

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
