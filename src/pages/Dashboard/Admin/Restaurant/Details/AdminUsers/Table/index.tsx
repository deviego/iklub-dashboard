import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Table, TableCellWithActionButtons } from "~/components";
import strings from "~/resources/strings";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import API from "~/resources/api";
import Store from "./store";

interface IProps {
	restaurantId: string;
}

const AdminUsersTable: React.FC<IProps> = (props) => {
	const { restaurantId } = props;
	const pageStrings = strings.restaurants.adminUsersTable;
	const modal = strings.common.modal;
	const store = useLocalObservable(() => new Store(restaurantId));
	const { dialog } = useGlobalStore();

	const history = useHistory();

	const onDeleteUser = (id: string) => {
		store.deleteAdminUser(id);
		dialog.closeDialog();
	};

	const onGoToEditUser = (id: string) => history.push(`/dashboard/admin/restaurants/${restaurantId}/adminUsers/edit/${id}`);

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
		<Flex flexDir="column" p={{ base: "2", lg: "16" }} >
			<Table
				data={store._items}
				headers={pageStrings.header}
				addButtonText={pageStrings.addButtonText}
				renderRow={(item) => (
					<Tr key={item.id} >
						<TableCellWithActionButtons
							onEdit={() => onGoToEditUser(item.id)}
							onDelete={() => openDialog(item)}
						/>
						<Td>
							<Text>{item.name}</Text>
						</Td>
						<Td>
							<Text>{item.email}</Text>
						</Td>
					</Tr>
				)}
				loading={store._loading}
				emptyMessage={strings.common.noResutls}
				currentPage={store.page}
				prevPage={store.previousPage}
				nextPage={store.nextPage}
				hasNextPage={store._isHaveNextPage}
				isCard
			/>
		</Flex>
	);
};

export default observer(AdminUsersTable);
