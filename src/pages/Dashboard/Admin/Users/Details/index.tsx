import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
	Button,
	Flex,
	Td,
	Tr,
	Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import {
	CentralizedCard,
	DetailsUser,
	Table,
	TableCellWithActionButtons,
} from "~/components";

import strings from "~/resources/strings";
import format from "~/resources/format";

import Store from "./store";

interface IParams {
	id?: string;
}

const Details: React.FC = () => {
	const commonStrings = strings.common;
	const pageStrings = strings.purchasedProductsByUser.table;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const store = useLocalObservable(() => new Store(id || ""));

	const onGoToEditUser = (userId: string) => history.push(`/dashboard/users/edit/${userId}`);
	const onGoToDetailsPurchasedProduct = (productId: string) => history.push(`/dashboard/users/purchasedProducts/details/${productId}`);

	const goBack = () => history.goBack();

	return (
		<>
			<CentralizedCard
				title={{
					text: commonStrings.detailsTitle,
					helper: (
						<Tooltip label={strings.common.edit}>
							<IconButton
								variant="icon"
								aria-label="Edit"
								size="lg"
								icon={
									<EditIcon w="24px"
										h="24px"
										onClick={() => onGoToEditUser(id || "")}
									/>
								}
							/>
						</Tooltip>
					),
				}}
			>
				{store.fetchModelShelf.model.value &&
					<DetailsUser
						user={store.fetchModelShelf.fetchedModel}
					/>}
			</CentralizedCard>
			<Flex flexDir="column" p={{ base: 3 , sm: 14 }} >
				<Table
					w="100%"
					maxW={{ base:"100%", md:"75%", lg:"60%" }}
					data={store.paginetedListShelf.items}
					headers={pageStrings.header}
					renderRow={(item) => (
						<Tr key={item.id}>
							<TableCellWithActionButtons
								onView={()=> onGoToDetailsPurchasedProduct(item.id)}
							/>
							<Td>
								<Text>{item.product.title}</Text>
							</Td>
							<Td>
								<Text>{item.totalDoses}</Text>
							</Td>
							<Td>
								<Text>{item.totalDoses - item.consumedDoses}</Text>
							</Td>
							<Td>
								<Text>{item.consumedDoses}</Text>
							</Td>
							<Td>
								<Text>{format.date(item.purchasedAt)}</Text>
							</Td>
						</Tr>
					)}
					loading={store.fetchModelShelf.loader.isLoading}
					emptyMessage={strings.common.noResutls}
					currentPage={store.paginetedListShelf.page}
					prevPage={store.paginetedListShelf.previousPage}
					nextPage={store.paginetedListShelf.nextPage}
					hasNextPage={store.paginetedListShelf.hasNextPage}
				/>
			</Flex>
			<Flex justifyContent="center" px={{ base: 3 , sm: 14 }} pb={16}>
				<Button

					variant="outline"
					minW={{ base: "100%", md: 280 }}
					size="lg"
					isLoading={store.fetchModelShelf.loader.isLoading}
					onClick={goBack}
				>
					{strings.actions.back}
				</Button>
			</Flex>
		</>
	);
};

export default observer(Details);
