import { LoaderShelf, AbstractPaginatedListStore, AttributeShelf } from "@startapp/mobx-utils";

import { showErrorToast, showSuccessToast } from "~/resources/toast";
import { Errors } from "~/resources/errors";
import strings from "~/resources/strings";
import api from "~/resources/api";

export default class Store extends AbstractPaginatedListStore<api.AdminUser> {

	public loader = new LoaderShelf();
	public id = new AttributeShelf("");

	constructor(id: string) {
		super();
		this.id.setValue(id);
		this.fetchPage(0);
	}

	protected getDataItemsPerPage(page: number): Promise<api.AdminUser[]> {
		return api.getAllAdminUsersByRestaurantId(page, this.id.value);
	}

	public deleteAdminUser = async (id: string) => {
		this.loader.tryStart();
		try {

			const deletedUser = await api.deleteAdminUser(id);

			showSuccessToast(strings.users.table.delete(deletedUser.name));
			this.refresh();
		} catch (e) {
			const errorMessage = Errors.handleError(e);
			showErrorToast(errorMessage);
		} finally {
			this.loader.end();
		}
	};
}
