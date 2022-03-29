import { makeAutoObservable } from "mobx";
import { LoaderShelf, FetchModelShelf } from "@startapp/mobx-utils";
import api from "~/resources/api";
import { ImagePickerShelf } from "@startapp/mobx-utils/src/web";

export default class Store {

	public loader = new LoaderShelf();
	public fetchModelShelf: FetchModelShelf<api.User>;
	public imageShelf = new ImagePickerShelf(api.uploadImage);

	constructor(id: string) {
		makeAutoObservable(this);

		this.fetchModelShelf = new FetchModelShelf(
			id,
			(idUser) => api.getUser(idUser),
			{
				fetchOnConstructor: true,
			},
		);

	}
}
