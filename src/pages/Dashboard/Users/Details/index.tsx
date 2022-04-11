import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
	Button,
	Image,
	Box,
	Flex,
	Td,
	Tr,
	Text,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import {
	AddressDetails,
	CentralizedCard,
	DetailsRow,
	Label,
	Table,
} from "~/components";

import strings from "~/resources/strings";
import format from "~/resources/format";

import Store from "./store";

import imagePlaceholder from "../../../../../static/pick_image.svg";

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
					<>
						<Box>
							<Label fontWeight="bold" marginBottom={1}>
								{commonStrings.fields.photo}
							</Label>
							<Image
								width={120}
								height={120}
								backgroundColor="white"
								p={0}
								m={0}
								src={store.fetchModelShelf.fetchedModel.image ? store.fetchModelShelf.fetchedModel.image.url : imagePlaceholder}
								rounded="lg"
							/>
						</Box>
						<DetailsRow
							label={commonStrings.fields.name}
							value={store.fetchModelShelf.fetchedModel.name}
						/>
						<DetailsRow
							label={commonStrings.fields.email}
							value={store.fetchModelShelf.fetchedModel.email}
						/>
						<DetailsRow
							label={commonStrings.fields.phone}
							value={store.fetchModelShelf.fetchedModel.phone}
						/>
						{
							store.fetchModelShelf.fetchedModel.address &&
								<AddressDetails
									address={store.fetchModelShelf.fetchedModel.address}
								/>
						}
					</>}
			</CentralizedCard>
			<Flex flexDir="column" p={{ base: 3 , sm: 14 }} >
				<Table
					w="100%"
					maxW={{ base:"100%", md:"75%", lg:"60%" }}
					data={store.paginetedListShelf.items}
					headers={pageStrings.header}
					renderRow={(item) => (
						<Tr key={item.id}>
							<Td>
								<Text>{item.product.title}</Text>
							</Td>
							<Td>
								<Text>{item.product.price}</Text>
							</Td>
							<Td>
								<Text>{item.product.totalNumberOfDoses}</Text>
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
