import React from "react";
import { useHistory } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { useGlobalStore } from "../../../../../contexts/useGlobalContext";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";

import { Table, TableCellWithActionButtons } from "~/components";

import format from "~/resources/format";
import strings from "~/resources/strings";

import Store from "./store";

const TableView: React.FC = () => {
	const pageStrings = strings.consumptions;
	const { dialog } = useGlobalStore();

	const store = useLocalObservable(() => new Store());

	const history = useHistory();

	const onGoToDetailsPurchasedProducts = (id: string) => history.push(`consumptions/details/${id}`);

	const openDeleteDialog = (consumptionId: string) => {
		dialog.showDialog({
			title: pageStrings.pendingTable.deleteModal.title,
			closeOnOverlayClick: true,
			description:  pageStrings.pendingTable.deleteModal.description,
			buttons: [
				{
					title: strings.common.refuse,
					onPress: () => {
						store.deleteConsumptionRequest(consumptionId);
						dialog.closeDialog();
					},
					buttonProps: { bg: "red.500" },
				},
				{
					title: strings.common.cancel,
					onPress: () => dialog.closeDialog(),
					outlined: true,
				},
			],
		});
	};

	const openApproveDialog = (consumptionId: string) => {
		dialog.showDialog({
			title: pageStrings.pendingTable.approveModal.title,
			closeOnOverlayClick: true,
			description:  pageStrings.pendingTable.approveModal.description,
			buttons: [
				{
					title: strings.common.approve,
					onPress: () => {
						store.approveConsumptionRequest(consumptionId);
						dialog.closeDialog();
					},
					buttonProps: { bg: "green.500" },
				},
				{
					title: strings.common.cancel,
					onPress: () => dialog.closeDialog(),
					outlined: true,
				},
			],
		});
	};

	return (
		<>
			<Flex flexDir="column" p={{ base: "2", lg: "16" }}>
				<Table
					tableTitle={pageStrings.pendingTable.title}
					data={store.pendingConsumptionsListShelf.items}
					headers={pageStrings.pendingTable.header}
					renderRow={(item) => (
						<Tr key={item.id} >
							<TableCellWithActionButtons
								onView={() => onGoToDetailsPurchasedProducts(item.id)}
								onApprove={() => openApproveDialog(item.id)}
								onRefuse={() => openDeleteDialog(item.id)}
							/>
							<Td>
								<Text>{item.purchasedProduct.product.title}</Text>
							</Td>
							<Td>
								<Text>{item.amount}</Text>
							</Td>
							<Td>
								<Text>{format.date(item.createdAt)}</Text>
							</Td>
							<Td>
								<Text>{item.user.name}</Text>
							</Td>
						</Tr>
					)}
					loading={store.pendingConsumptionsListShelf.loader.isLoading}
					emptyMessage={strings.common.noResutls}
					currentPage={store.pendingConsumptionsListShelf.page}
					prevPage={store.pendingConsumptionsListShelf.previousPage}
					nextPage={store.pendingConsumptionsListShelf.nextPage}
					hasNextPage={store.pendingConsumptionsListShelf.hasNextPage}
				/>
			</Flex>
			<Flex flexDir="column" p={{ base: "2", lg: "16" }}>
				<Table
					tableTitle={pageStrings.table.title}
					data={store.consumptionsListShelf.items}
					headers={pageStrings.table.header}
					renderRow={(item) => (
						<Tr key={item.id} >
							<TableCellWithActionButtons
								onView={() => onGoToDetailsPurchasedProducts(item.id)}
							/>
							<Td>
								<Text>{item.purchasedProduct.product.title}</Text>
							</Td>
							<Td>
								<Text>{item.amount}</Text>
							</Td>
							<Td>
								<Text>{format.date(item.createdAt)}</Text>
							</Td>
							<Td>
								<Text>{item.acceptedAt ? format.date(item.acceptedAt) : null}</Text>
							</Td>
							<Td>
								<Text>{item.user.name}</Text>
							</Td>
						</Tr>
					)}
					loading={store.consumptionsListShelf.loader.isLoading}
					emptyMessage={strings.common.noResutls}
					currentPage={store.consumptionsListShelf.page}
					prevPage={store.consumptionsListShelf.previousPage}
					nextPage={store.consumptionsListShelf.nextPage}
					hasNextPage={store.consumptionsListShelf.hasNextPage}
				/>
			</Flex>
		</>
	);
};

export default observer(TableView);
