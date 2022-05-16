import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

import { ProductTable } from "~/components";

import Store from "./store";

const TableView: React.FC = () => {
	const store = useLocalObservable(() => new Store());

	const productsAdminRoute = "/dashboard/admin/productsForAdmin";

	return (
		<ProductTable
			paginatedListShelf={store.paginetedListShelf}
			deleteProduct={store.deleteProduct}
			changeDisableStatus={store.changeProductDisableStatus}
			redirectTo={{
				create: () => `${productsAdminRoute}/create`,
				edit: (id) => `${productsAdminRoute}/edit/${id}`,
				details: (id) => `${productsAdminRoute}/details/${id}`,
			}}
		/>
	);
};

export default observer(TableView);
