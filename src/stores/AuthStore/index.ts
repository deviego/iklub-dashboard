import { makeAutoObservable, runInAction } from "mobx";
import { FormShelf } from "@startapp/mobx-utils/src/web";
import { LoaderShelf } from "@startapp/mobx-utils";
// import { CustomError } from "../../resources/customError";
// import { Errors } from "../../resources/errors";
// import strings from "../../resources/strings";
// import api from "../../resources/api";
// import { showErrorToast } from "~/resources/toast";

interface IFormData {
	email: string;
	password: string;
	newPassword: string;
	confirmNewPassword: string;
	token: string;
}

interface IHandleResponse {
	onSuccess: () => void;
	onError: (e: string) => void;
}


export default class AuthStore {
	public form: FormShelf<IFormData>;

	public receivedToken = "";
	public loader = new LoaderShelf();
	// public currentAdminUser: api.AdminUser | null = null;
	// public profileImage = new ImagePickerShelf(api.uploadImage);

	// private localstorage_key = "cbwhisky_currentAdminUser";

	public formProfile = new FormShelf({
		name: "",
		email: "",
	});

	constructor() {
		this.form = new FormShelf({
			email: "",
			password: "",
			newPassword: "",
			confirmNewPassword: "",
			token: "",
		});
		makeAutoObservable(this);
	}

	public login = async (onSucess?: (userName: string) => void, onError?: (e: string) => void) => {
		this.loader.tryStart();
		try {
			// const data = this.form.getValues();
			// const currentAdminUser = await api.adminLogin(
			// 	data.email,
			// 	data.password,
			// );
			// this.setCurrentAdminUser(currentAdminUser);
			// if (onSucess) {
			// 	onSucess(currentAdminUser.name);
			// }
		} catch (e) {
			// const errors = Errors.handleError(e);
			if (onError) {
				// onError(errors);
			}
		} finally {
			this.loader.end();
		}
	};

	public getCurrentAdminUser = async () => {
		this.loader.tryStart();
		// const currentUserJson = this.getCurrentAdminUserLocalStorage();

		try {
			// if (!currentUserJson) {
			// 	// throw new CustomError(api.ErrorType.NotLoggedIn, strings.error.notLoggedIn);
			// }

			// // const currenAdminUser = await api.getCurrentAdminLogged(JSON.parse(currentUserJson));
			// this.setCurrentAdminUser(currenAdminUser);
		} catch (e) {
			// Errors.handleError(e);
		} finally {
			this.loader.end();
		}
	};

	// public setValuesFormShelf = (adminUser: api.AdminUser) => {
	// 	this.formProfile = new FormShelf({
	// 		email: adminUser.email,
	// 		name: adminUser.name,
	// 	});
	// };

	public editAdminUser = async (id: string, handleResponse: IHandleResponse) => {
		this.loader.tryStart();
		try {
			// const data = this.formProfile.getValues();

			// const newAdminUser: api.EditAdminUser = {
			// 	name: data.name,
			// 	email: data.email,
			// };

			// this.setCurrentAdminUser(await api.editAdminUser(id, newAdminUser));
			handleResponse.onSuccess();
		} catch (e) {
			handleResponse.onError(e.message);
		} finally {
			this.loader.end();
		}
	};

	public isLogged = async () => {
		this.loader.start();

		try {
			// const resultAdminUser = await api.getCurrentAdminLogged();
			// this.setCurrentAdminUser(resultAdminUser);
		} catch (e) {
			localStorage.clear();
		} finally {
			this.loader.end();
		}

		// return !!this.currentAdminUser;
	};

	// public authenticate = async (
	// 	onSuccess: () => void = () => { },
	// 	onFail: () => void = () => { },
	// ) => {
	// 	if (!(await this.isLogged())) {
	// 		onFail();
	// 	} else {
	// 		onSuccess();
	// 	}
	// };

	// public setCurrentAdminUser = (user: api.AdminUser | null) => {
	// 	// this.currentAdminUser = user;
	// 	if (!user) {
	// 		this.removeFromLocalStorage();
	// 		return;
	// 	}

	// 	this.setValuesFormShelf(user);
	// 	this.saveOnLocalStorage();
	// };

	public logout = async (onSucess: () => void, onError?: (e: string) => void) => {
		this.loader.tryStart();
		try {
			// await api.logoutAdminUser();
			// this.setCurrentAdminUser(null);
			onSucess();
		} catch (e) {
			if (onError) {
				onError(e.message);
			}
		} finally {
			this.loader.end();
		}
	};

	public validateToken = async (onSuccess: (message: string) => void, onError: (e: string) => void) => {
		this.form.fieldError.clearErrors();
		// const data = this.form.getValues();
		if (this.loader.isLoading) {
			return;
		}

		this.loader.start();

		try {
			// const resultValidate = await api.validateToken(data.token);

			// if (resultValidate) {
			// 	runInAction(() => {
			// 		this.receivedToken = data.token;
			// 	});
			// }
			// onSuccess(strings.recoveryPage.validToken);
		} catch (e) {
			// const errors = Errors.handleError(e);
			// this.form.fieldError.addError({
			// 	message: errors,
			// 	field: "token",
			// });
			onError(e.message);
		} finally {
			this.loader.end();
		}
	};

	public validateTokenUrl = async (
		onSuccess: () => void,
		onError: () => void,
		// token: string,
	) => {
		this.form.fieldError.clearErrors();
		if (this.loader.isLoading) {
			return;
		}

		this.loader.start();

		try {
			// const resultValidateUrl = await api.validateToken(token);
			// if (resultValidateUrl) {
			// 	runInAction(() => (this.receivedToken = token));
			// }

			onSuccess();
		} catch (e) {
			onError();
		} finally {
			this.loader.end();
		}
	};

	public setToken = (token: string) => {
		runInAction(() => (this.receivedToken = token));
	};

	public resetPassword = async (onSuccess: () => void, onError: (e: string) => void) => {
		this.form.fieldError.clearErrors();

		if (this.loader.isLoading) {
			return;
		}

		this.loader.start();

		try {
			// const data = this.form.getValues();
			// if (data.newPassword !== data.confirmNewPassword) {
			// 	this.form.fieldError.addError({
			// 		message: strings.recoveryPage.samePasswordError,
			// 		field: "password",
			// 	});
			// 	this.form.fieldError.addError({
			// 		message: strings.recoveryPage.samePasswordError,
			// 		field: "confirmNewPassword",
			// 	});
			// 	showErrorToast(strings.recoveryPage.samePasswordError);
			// } else {
			// 	await api.resetPassword(this.receivedToken, data.newPassword);
			// 	runInAction(() => {
			// 		data.password = data.newPassword;
			// 	});
			// 	this.login();
			// 	this.clear();
			// 	onSuccess();
			// }
		} catch (e) {
			const error = JSON.parse(e.message);
			onError(error.message);
		} finally {
			this.loader.end();
		}
	};

	public sendNewPassword = async (onSuccess: () => void, onError: (e: string) => void) => {
		this.form.fieldError.clearErrors();
		// const data = this.form.getValues();
		this.loader.start();

		try {
			// await api.sendRequestResetPassword(data.email);
			onSuccess();
		} catch (e) {
			// const errors = Errors.handleError(e);
			// this.form.fieldError.addError({
			// 	message: errors,
			// 	field: "email",
			// });
			onError(e.message);
		} finally {
			this.loader.end();
		}
	};

	private clear = () => {
		const data = this.form.getValues();
		runInAction(() => {
			data.email = "";
			data.password = "";
			this.receivedToken = "";
			data.token = "";
		});
	};

	// public getCurrentAdminUserLocalStorage = () => {
	// 	const currentAdminUserString = localStorage.getItem(this.localstorage_key);
	// 	return currentAdminUserString;
	// };

	// public saveOnLocalStorage = () => {
	// 	localStorage.setItem(this.localstorage_key, JSON.stringify(this.currentAdminUser));
	// };

	// public removeFromLocalStorage = () => {
	// 	localStorage.removeItem(this.localstorage_key);
	// };
}
