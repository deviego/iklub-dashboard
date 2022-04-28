import { makeAutoObservable } from "mobx";
import { AttributeShelf, LoaderShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";
import { Errors } from "~/resources/errors";
import { showErrorToast, showSuccessToast } from "~/resources/toast";
import strings from "~/resources/strings";

export default class Store {

	public loader = new LoaderShelf();
	public bankAccount: AttributeShelf<api.BankAccount | null> = new AttributeShelf(null);
	public balance: AttributeShelf<api.Balance | null> = new AttributeShelf(null);
	public withdrawAmount = new AttributeShelf(0);

	constructor(onBalanceError?: () => void) {
		makeAutoObservable(this);
		this.getBalance(onBalanceError);
	}

	public getBalance = async(onError?: () => void) => {
		this.loader.tryStart();
		try {
			const bankAccount = await api.getBankAccountForRestaurantAdminUser();
			const clinicBalance = await api.getRestaurantBalance();
			this.balance.setValue(clinicBalance);
			this.bankAccount.setValue(bankAccount);
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
			if (onError) {
				onError();
			}
		} finally {
			this.loader.end();
		}
	};

	public withdrawEarnings = async() => {
		this.loader.tryStart();
		try {
			const transferredBalance = await api.createTransfer(this.withdrawAmount.value);
			this.balance.setValue(transferredBalance);
			showSuccessToast(strings.wallet.success);
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};

}
