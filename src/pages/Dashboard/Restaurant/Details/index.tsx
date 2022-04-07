import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import {
	ButtonActions,
	CentralizedCard,
	DetailsRestaurant,
	ProductTable,
} from "~/components";

import strings from "~/resources/strings";

import Store from "./store";

import AdminUsersTable from "./AdminUsers/Table/index";

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
				button={(
					<ButtonActions
						isLoading={store.loader.isLoading}
						action={goBack}
						value={strings.actions.back}
						variant="outline"
					/>
				)}
			>
				{store.fetchModelShelf.model.value &&
					<>
						<DetailsRestaurant
							restaurant={store.fetchModelShelf.fetchedModel}
						/>
					</>}
			</CentralizedCard>
			{id && (
				<CentralizedCard
					isTable
					title={{ text: strings.adminRestaurantUsers.table.title }}
					button={
						<>
							<ButtonActions
								isLoading={store.loader.isLoading}
								action={onGoToCreateUser}
								value={strings.adminRestaurantUsers.table.tableAddButton}
							/>
						</>
					}
				>
					<AdminUsersTable restaurantId={id} />
				</CentralizedCard>
			)}
			{store.paginetedListShelf && (
				<ProductTable
					maxW={{ base: "100%", md: "75%", lg: "60%" }}
					cardTableProps={{ maxW: "100%" }}
					mx="auto"
					px={0}
					paginatedListShelf={store.paginetedListShelf}
					deleteProduct={store.deleteProduct}
					changeDisableStatus={store.changeProductDisableStatus}
					redirectTo={{
						edit: (productId) => `${productsAdminRoute}/edit/${productId}`,
						details: (productId) => `${productsAdminRoute}/details/${productId}`,
					}}
				/>
			)}
		</>
	);
};

export default observer(Details);
