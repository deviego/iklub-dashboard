import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { Table } from "~/components";
import strings from "~/resources/strings";
import format from "~/resources/format";
import api from "~/resources/api";
import { PaginatedListShelf } from "@startapp/mobx-utils";

interface IProps {
	store: PaginatedListShelf<api.Consumption>;
	headers: string[];
}

export const ConsumptionHistory: React.FC<IProps> = observer((props) => {
	const { store, headers } = props;
	const pageStrings = strings.purchasedProducts.consumptionHistory;

	return (
		<Flex flexDir="column" >
			<Table
				data={store.items}
				headers={headers}
				renderRow={(item) => (
					<Tr key={item.id} >
						<Td>
							<Text>{item.amount}</Text>
						</Td>
						<Td>
							<Text>{api.translateConsumptionStatus(item.status)}</Text>
						</Td>
						<Td>
							<Text>{item.acceptedAt ? format.date(item.acceptedAt) : pageStrings.notValidated}</Text>
						</Td>
					</Tr>
				)}
				loading={store.loader.isLoading}
				emptyMessage={strings.common.noResutls}
				currentPage={store.page}
				prevPage={store.previousPage}
				nextPage={store.nextPage}
				hasNextPage={store.hasNextPage}
				isCard
			/>
		</Flex>
	);
});
