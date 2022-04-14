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
	const pageStrings = strings.adminRestaurantUsers.table;
	const modal = strings.common.modal;
	const { dialog, authStore } = useGlobalStore();

	const restaurantId = authStore.currentAdminUser?.restaurant?.id;

	const store = useLocalObservable(() => new Store());

	const history = useHistory();

	const onDeleteUser = (id: string) => {
		store.deleteAdminRestaurantUser(id);
		dialog.closeDialog();
	};

	const onGoToEditAdminRestaurantUser = (id: string) => history.push(`adminRestaurantUsers/edit/${id}`);
	const onGoToDetailsAdminRestaurantUser = (id: string) => history.push(`adminRestaurantUsers/details/${id}`);
	const onGoToCreateAdminRestaurantUser = () => history.push("adminRestaurantUsers/create/");

	const openDialog = (user: API.AdminUser) => {
		dialog.showDialog({
			title: modal.title,
			closeOnOverlayClick: true,
			description: modal.description(user.name),
			buttons: [
				{
					title: modal.button.delete,
					onPress: () => onDeleteUser(user.id),
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
				data={store.paginetedListShelf.items}
				headers={pageStrings.header(!!restaurantId)}
				onAdd={onGoToCreateAdminRestaurantUser}
				addButtonText={pageStrings.tableAddButton}
				renderRow={(item) => (
					<Tr key={item.id} >
						<TableCellWithActionButtons
							onView={restaurantId ? () => onGoToDetailsAdminRestaurantUser(item.id) : undefined}
							onEdit={() => onGoToEditAdminRestaurantUser(item.id)}
							onDelete={() => openDialog(item)}
						/>
						<Td>
							<Text>{item.name}</Text>
						</Td>
						{
							!restaurantId &&
								<Td>
									<Text>{item.restaurant?.name}</Text>
								</Td>
						}
						<Td>
							<Text>{moment(item.createdAt).format(strings.moment.date)}</Text>
						</Td>
					</Tr>
				)}
				loading={store.paginetedListShelf.loader._loading}
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
