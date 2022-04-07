import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
	Button,
	Box,
	Image,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import {
	AddressDetails,
	CentralizedCard,
	DetailsRow,
	Label,
	ProductTable,
} from "~/components";

import strings from "~/resources/strings";

import Store from "./store";

import AdminUsersTable from "./AdminUsers/Table/index";

import imagePlaceholder from "../../../../../static/pick_image.svg";

interface IParams {
	id?: string;
}

const Details: React.FC = () => {
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const store = useLocalObservable(() => new Store(id || ""));

	const onGoToEditRestaurant = (restaurantId: string) => history.push(`/dashboard/restaurants/edit/${restaurantId}`);
	const onGoToCreateUser = () => history.push(`/dashboard/restaurants/${id}/adminUsers/create/`);

	const goBack = () => history.goBack();

	const productsAdminRoute = "/dashboard/productsForAdmin";

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
									<EditIcon
										w="24px"
										h="24px"
										mt={23}
										onClick={() => onGoToEditRestaurant(id || "")}
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
							label={commonStrings.fields.corporateName}
							value={store.fetchModelShelf.fetchedModel.corporateName}
						/>
						<DetailsRow
							label={commonStrings.fields.documentNumber}
							value={store.fetchModelShelf.fetchedModel.documentNumber}
						/>
						<AddressDetails
							address={store.fetchModelShelf.fetchedModel.address}
						/>
					</>}
			</CentralizedCard>
			{id && (
				<CentralizedCard
					isTable
					title={{ text: strings.adminRestaurantUsers.table.title }}
					button={
						<Button
							minW={{ base: "100%", md: 280 }}
							size="lg"
							mt={10}
							isLoading={store.loader.isLoading}
							onClick={onGoToCreateUser}
						>
							{strings.adminRestaurantUsers.table.tableAddButton}
						</Button>
					}
				>
					<AdminUsersTable restaurantId={id} />
				</CentralizedCard>
			)}
			{store.paginetedListShelf && (
				<CentralizedCard
					isTable
					title={{ text: strings.products.table.title }}
					button={(
						<Button
							variant="outline"
							minW={{ base: "100%", md: 280 }}
							size="lg"
							mt={10}
							isLoading={store.loader.isLoading}
							onClick={goBack}
						>
							{strings.actions.back}
						</Button>
					)}
				>
					<ProductTable
						cardTableProps={{ maxW: "100%" }}
						px={0}
						paginatedListShelf={store.paginetedListShelf}
						deleteProduct={store.deleteProduct}
						changeDisableStatus={store.changeProductDisableStatus}
						redirectTo={{
							edit: (productId) => `${productsAdminRoute}/edit/${productId}`,
							details: (productId) => `${productsAdminRoute}/details/${productId}`,
						}}
					/>
				</CentralizedCard>
			)}
		</>
	);
};

export default observer(Details);
