import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { Table, TableCellWithActionButtons } from "~/components";
import strings from "~/resources/strings";
import { useHistory } from "react-router-dom";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import API from "~/resources/api";
import Store from "./store";

const TableView: React.FC = () => {
	const pageStrings = strings.adminUsers.table;
	const modal = strings.common.modal;
	const store = useLocalObservable(() => new Store());
	const { dialog } = useGlobalStore();

	const history = useHistory();

	const onDeleteUser = (id: string) => {
		store.deleteUser(id);
		dialog.closeDialog();
	};

	const onGoToEditUser = (id: string) => history.push(`adminUsers/edit/${id}`);
	const onGoToDetailsUser = (id: string) => history.push(`adminUsers/details/${id}`);
	const onGoToCreateUser = () => history.push("adminUsers/create/");

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
		<Flex p={{ base: "2", lg: "16"}}>
			<Table
				data={store._items}
				headers={pageStrings.header}
				onAdd={onGoToCreateUser}
				addButtonText={pageStrings.addButtonText}
				renderRow={(item) => (
					<Tr key={item.id} >
						<TableCellWithActionButtons
							onView={() => onGoToDetailsUser(item.id)}
							onEdit={() => onGoToEditUser(item.id)}
							onDelete={() => openDialog(item)}
							onBlock={()=>{}}
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
			/>
		</Flex>
	);
};

export default observer(TableView);
