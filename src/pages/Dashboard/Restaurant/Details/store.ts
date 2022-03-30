import { LoaderShelf, FetchModelShelf } from "@startapp/mobx-utils";
import api from "~/resources/api";
import { makeAutoObservable } from "mobx";

export default class Store{

	public loader = new LoaderShelf();
	public fetchModelShelf: FetchModelShelf<api.Restaurant>;

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			api.getRestaurantById,
			{
				fetchOnConstructor: true,
			},
		);

	}
}
