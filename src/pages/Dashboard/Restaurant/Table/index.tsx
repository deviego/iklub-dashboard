import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import moment from "moment";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { Table, TableCellWithActionButtons } from "~/components";
import strings from "~/resources/strings";
import { useHistory } from "react-router-dom";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import API from "~/resources/api";
import Store from "./store";

const TableView: React.FC = () => {
	const pageStrings = strings.restaurants.table;
	const modal = strings.common.modal;
	const { dialog } = useGlobalStore();

	const store = useLocalObservable(() => new Store());

	const history = useHistory();

	const onDeleteRestaurant = (id: string) => {
		store.deleteRestaurant(id);
		dialog.closeDialog();
	};

	const onGoToEditRestaurant = (id: string) => history.push(`restaurants/edit/${id}`);
	const onGoToDetailsRestaurant = (id: string) => history.push(`restaurants/details/${id}`);
	const onGoToCreateRestaurant = () => history.push("restaurants/create/");

	const openDialog = (user: API.Restaurant) => {
		dialog.showDialog({
			title: modal.title,
			closeOnOverlayClick: true,
			description: modal.description(user.name),
			buttons: [
				{
					title: modal.button.delete,
					onPress: () => onDeleteRestaurant(user.id),
					buttonProps: { bg: "red.500" },
				},
				{
					title: modal.button.cancel,
					onPress: () => dialog.closeDialog(),
					outlined: true,
				},
			],
		});
	};

	return (
		<Flex flexDir="column" p={{ base: "2", lg: "16" }}>
			<Table
				data={store._items}
				headers={pageStrings.header}
				onAdd={onGoToCreateRestaurant}
				addButtonText={pageStrings.addButtonText}
				renderRow={(item) => (
					<Tr key={item.id} >
						<TableCellWithActionButtons
							onView={() => onGoToDetailsRestaurant(item.id)}
							onEdit={() => onGoToEditRestaurant(item.id)}
							onDelete={() => openDialog(item)}
						/>
						<Td>
							<Text>{item.name}</Text>
						</Td>
						<Td>
							<Text>{item.documentNumber}</Text>
						</Td>
						<Td>
							<Text>{moment(item.createdAt).format(strings.moment.date)}</Text>
						</Td>
					</Tr>
				)}
				loading={store._loading}
				emptyMessage={strings.common.noResutls}
				currentPage={store.page}
				prevPage={store.previousPage}
				nextPage={store.nextPage}
				hasNextPage={store._isHaveNextPage}
			/>
		</Flex>
	);
};

export default observer(TableView);
