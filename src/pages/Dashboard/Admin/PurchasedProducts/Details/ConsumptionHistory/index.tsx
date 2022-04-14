import React from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import { Table } from "~/components";
import strings from "~/resources/strings";
import Store from "./store";
import api from "~/resources/api";

interface IProps {
	purchasedProductId: string;
}

const ConsumptionHistory: React.FC<IProps> = (props) => {
	const { purchasedProductId } = props;
	const pageStrings = strings.purchasedProducts.consumptionHistory;
	const store = useLocalObservable(() => new Store(purchasedProductId));

	return (
		<Flex flexDir="column" p={{ base: "2", lg: "16" }} >
			<Table
				data={store.paginetedListShelf.items}
				headers={pageStrings.header}
				renderRow={(item) => (
					<Tr key={item.id} >
						<Td>
							<Text>{item.amount}</Text>
						</Td>
						<Td>
							<Text>{api.translateConsumptionStatus(item.status)}</Text>
						</Td>
						<Td>
							<Text>{item.acceptedAt || pageStrings.notValidated}</Text>
						</Td>
					</Tr>
				)}
				loading={store.paginetedListShelf.loader.isLoading}
				emptyMessage={strings.common.noResutls}
				currentPage={store.paginetedListShelf.page}
				prevPage={store.paginetedListShelf.previousPage}
				nextPage={store.paginetedListShelf.nextPage}
				hasNextPage={store.paginetedListShelf.hasNextPage}
				isCard
			/>
		</Flex>
	);
};

export default observer(ConsumptionHistory);
