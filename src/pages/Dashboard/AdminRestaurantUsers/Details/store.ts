import { makeAutoObservable } from "mobx";
import { LoaderShelf, FetchModelShelf } from "@startapp/mobx-utils";
import api from "~/resources/api";

export default class Store {

	public loader = new LoaderShelf();
	public fetchModelShelf: FetchModelShelf<api.AdminUser>;

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			(idAdmin) => api.getAdminRestaurantUser(idAdmin),
			{
				fetchOnConstructor: true,
			},
		);

	}
}

