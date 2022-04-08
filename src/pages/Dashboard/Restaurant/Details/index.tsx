import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	Button,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import {
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
										onClick={() => onGoToEditRestaurant(id || "")}
									/>
								}
							/>
						</Tooltip>
					),
				}}
			>
				{store.fetchModelShelf.model.value &&
					<DetailsRestaurant
						restaurant={store.fetchModelShelf.fetchedModel}
					/>}
			</CentralizedCard>
			{id && (
				<CentralizedCard
					isTable
					title={{ text: strings.adminRestaurantUsers.table.title }}
					button={
						<Button
							size="lg"
							minW={{ base: "100%", md: 280 }}
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
