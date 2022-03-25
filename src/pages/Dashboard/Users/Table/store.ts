// import { makeAutoObservable } from "mobx";
import { AbstractPaginatedListStore, LoaderShelf } from "@startapp/mobx-utils";
// import { Errors } from "~/resources/errors";
import api from "~/resources/api";
// import { showErrorToast } from "~/resources/toast";
// import strings from "~/resources/strings";

// const pageStrings = strings.users.createOrEdit;

export class Store extends AbstractPaginatedListStore<api.User> {

	public loader = new LoaderShelf();

	constructor() {
		super();
		this.fetchPage(0);
	}

	protected getDataItemsPerPage(page: number): Promise<api.User[]> {
		return api.getAllUsers(page);
	}

	// public getUser = async (id: string) => {
	// 	this.loader.tryStart();
	// 	try {
	// 		const user = await api.getUser(id);
	// 		this.setInitValues(user);
	// 	} catch (e) {
	// 		Errors.handleError(e);
	// 	} finally {
	// 		this.loader.end();
	// 	}
	// };
}
