// FIX-ME: Depois de add o filtro de data no getAllRestaurants descomentar codigo;
import React from "react";
import { useHistory } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";

import { DateFilter, Table, TableCellWithActionButtons } from "~/components";

// import { useGlobalStore } from "~/contexts/useGlobalContext";

import format from "~/resources/format";
import strings from "~/resources/strings";
// import API from "~/resources/api";

import Store from "./store";

const TableView: React.FC = () => {
	const pageStrings = strings.restaurants.table;
	// const modal = strings.common.modal;
	// const { dialog } = useGlobalStore();

	const store = useLocalObservable(() => new Store());

	const history = useHistory();

	// const onDeleteRestaurant = (id: string) => {
	// 	store.deleteRestaurant(id);
	// 	dialog.closeDialog();
	// };

	const onGoToEditRestaurant = (id: string) => history.push(`restaurants/edit/${id}`);
	const onGoToDetailsRestaurant = (id: string) => history.push(`restaurants/details/${id}`);
	const onGoToCreateRestaurant = () => history.push("restaurants/create/");

	// const openDialog = (user: API.Restaurant) => {
	// 	dialog.showDialog({
	// 		title: modal.title,
	// 		closeOnOverlayClick: true,
	// 		description: modal.description(user.name),
	// 		buttons: [
	// 			{
	// 				title: modal.button.delete,
	// 				onPress: () => onDeleteRestaurant(user.id),
	// 				buttonProps: { bg: "red.500" },
	// 			},
	// 			{
	// 				title: modal.button.cancel,
	// 				onPress: () => dialog.closeDialog(),
	// 				outlined: true,
	// 			},
	// 		],
	// 	});
	// };

	// const openDialogBlockedRestaurant = (restaurant: API.Restaurant) => {
	// 	const modalBlockedRestaurant = strings.restaurants.modal;
	// 	dialog.showDialog({
	// 		title: modalBlockedRestaurant.title(!!restaurant.blockedAt),
	// 		closeOnOverlayClick: true,
	// 		description: modalBlockedRestaurant.description(restaurant.name, !!restaurant.blockedAt),
	// 		buttons: [
	// 			{
	// 				title: restaurant.blockedAt ?  modalBlockedRestaurant.button.enable :  modalBlockedRestaurant.button.disable,
	// 				onPress: () => {
	// 					store.changeRestaurantBlockStatus(restaurant.id, restaurant.blockedAt);
	// 					dialog.closeDialog();
	// 				},
	// 				buttonProps: { bg: restaurant.blockedAt ? "green.500" : "red.500" },
	// 			},
	// 			{
	// 				title: modalBlockedRestaurant.button.cancel,
	// 				onPress: () => dialog.closeDialog(),
	// 				outlined: true,
	// 			},
	// 		],
	// 	});
	// };

	return (
		<Flex flexDir="column" p={{ base: "2", lg: "16" }}>
			<DateFilter
				selectedDate={store.dateFilter.value}
				onChangeSelectedDate={store.dateFilter.setValue}
			/>
			<Table
				data={store.paginetedListShelf.items}
				headers={pageStrings.header}
				onAdd={onGoToCreateRestaurant}
				addButtonText={pageStrings.addButtonText}
				renderRow={(item) => (
					<Tr key={item.id} >
						<TableCellWithActionButtons
							onView={() => onGoToDetailsRestaurant(item.id)}
							onEdit={() => onGoToEditRestaurant(item.id)}
						// onDelete={() => openDialog(item)}
						// onBlock={() => openDialogBlockedRestaurant(item)}
						// isBlocked={!!item.blockedAt}
						/>
						<Td>
							<Text>{item.name}</Text>
						</Td>
						<Td>
							{/* <Text>{item.documentNumber}</Text> */}
						</Td>
						<Td>
							{item.createdAt && <Text>{format.date(item.createdAt)}</Text>}
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
