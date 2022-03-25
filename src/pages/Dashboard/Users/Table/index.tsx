import { Flex, Tr, Td, Text } from "@chakra-ui/react";
import { observer, useLocalObservable } from "mobx-react-lite";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { Table, TableCellWithActionButtons } from "~/components";
import strings from "~/resources/strings";
import format from "~/resources/format";
import { Store } from "./store";

const TableView: React.FC = () => {
	const pageStrings = strings.users.table;
	const store = useLocalObservable(() => new Store());

	const history = useHistory();

	const onGoToEditUser = (id: string) => history.push(`users/edit/${id}`);

	const onGoToDetails = (id: string) => history.push(`users/details/${id}`);

	return (
		<Flex flexDir="column" p={{ base: 2, lg: 16}}>
			<Table
				data={store._items}
				headers={pageStrings.header}
				renderRow={(item) => (
					<Tr key={item.id}>
						<TableCellWithActionButtons
							onEdit={() => onGoToEditUser(item.id)}
							onView={()=> onGoToDetails(item.id)}
						/>
						<Td>
							<Text>{item.name}</Text>
						</Td>
						<Td>
							<Text>{item.email}</Text>
						</Td>
						<Td>
							<Text>{format.date(item.createdAt)}</Text>
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
