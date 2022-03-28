// import { makeAutoObservable } from "mobx";
import { AbstractPaginatedListStore, LoaderShelf } from "@startapp/mobx-utils";

import api from "~/resources/api";

export class Store extends AbstractPaginatedListStore<api.User> {

	public loader = new LoaderShelf();

	constructor() {
		super();
		this.fetchPage(0);
	}

	protected getDataItemsPerPage(page: number): Promise<api.User[]> {
		return api.getAllUsers(page);
	}
}
