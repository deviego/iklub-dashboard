import React from "react";
import { useHistory } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";

import { CpfFilter, Table, TableCellWithActionButtons } from "~/components";

import format from "~/resources/format";
import strings from "~/resources/strings";

import Store from "./store";

const TableView: React.FC = () => {
	const pageStrings = strings.purchasedProducts.table;

	const store = useLocalObservable(() => new Store());

	const history = useHistory();

	const onGoToDetailsPurchasedProducts = (id: string) => history.push(`purchasedProducts/details/${id}`);

	const onConfirmSearch = () => {
		store.paginetedListShelf.refresh();
	};

	return (
		<Flex flexDir="column" p={{ base: "2", lg: "16" }}>
			<CpfFilter
				documentNumber={store.documentNumber.value}
				onChangeDocumentNumber={(cpf) => store.documentNumber.setValue(cpf)}
				onConfirm={onConfirmSearch}
			/>
			<Table
				data={store.paginetedListShelf.items}
				headers={pageStrings.header}
				renderRow={(item) => (
					<Tr key={item.id} >
						<TableCellWithActionButtons
							onView={() => onGoToDetailsPurchasedProducts(item.id)}
						/>
						<Td>
							<Text>{item.product.title}</Text>
						</Td>
						<Td>
							<Text>{format.currencyForBR(item.product.price)}</Text>
						</Td>
						<Td>
							<Text>{item.consumedDoses}</Text>
						</Td>
						<Td>
							<Text>{item.user.name}</Text>
						</Td>
						<Td>
							<Text>{item.user.email}</Text>
						</Td>
						<Td>
							{item.purchasedAt && <Text>{format.date(item.purchasedAt)}</Text>}
						</Td>
					</Tr>
				)}
				loading={store.paginetedListShelf.loader.isLoading}
				emptyMessage={strings.common.noResutls}
				currentPage={store.paginetedListShelf.page}
				prevPage={store.paginetedListShelf.previousPage}
				nextPage={store.paginetedListShelf.nextPage}
				hasNextPage={store.paginetedListShelf.hasNextPage}
			/>
		</Flex>
	);
};

export default observer(TableView);
