import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";

import { ProductTable } from "~/components";

import Store from "./store";

const TableView: React.FC = () => {
	const store = useLocalObservable(() => new Store());

	return (
		<ProductTable
			paginatedListShelf={store.paginetedListShelf}
			deleteProduct={store.deleteProduct}
			changeDisableStatus={store.changeProductDisableStatus}
			enableCreateButton
		/>
	);
};

export default observer(TableView);
