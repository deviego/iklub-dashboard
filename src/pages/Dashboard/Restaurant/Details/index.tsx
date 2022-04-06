import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	IconButton,
	Tooltip,
	Button,
	Flex,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import {
	CentralizedCard,
	DetailsRow,
	ProductTable,
} from "~/components";
import strings from "~/resources/strings";
import Store from "./store";

interface IParams {
	id?: string;
}

const Details: React.FC = () => {
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const store = useLocalObservable(() => new Store(id || ""));

	const onGoToEditUser = (userId: string) => history.push(`/dashboard/restaurants/edit/${userId}`);
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
						<DetailsRow
							label={commonStrings.fields.name}
							value={store.fetchModelShelf.fetchedModel.name}
						/>
						<DetailsRow
							label={commonStrings.fields.documentNumber}
							value={store.fetchModelShelf.fetchedModel.documentNumber}
						/>
						<DetailsRow
							label={commonStrings.fields.zipcode}
							value={store.fetchModelShelf.fetchedModel.address.zipcode}
						/>
						<DetailsRow
							label={commonStrings.fields.street}
							value={store.fetchModelShelf.fetchedModel.address.street}
						/>
						<DetailsRow
							label={commonStrings.fields.streetNumber}
							value={store.fetchModelShelf.fetchedModel.address.streetNumber}
						/>
						{store.fetchModelShelf.fetchedModel.address.complementary &&
							<DetailsRow
								label={commonStrings.fields.complementary}
								value={store.fetchModelShelf.fetchedModel.address.complementary}
							/>}
						{store.fetchModelShelf.fetchedModel.address.neighborhood &&
							<DetailsRow
								label={commonStrings.fields.neighborhood}
								value={store.fetchModelShelf.fetchedModel.address.neighborhood}
							/>}
						<DetailsRow
							label={commonStrings.fields.city}
							value={store.fetchModelShelf.fetchedModel.address.city}
						/>
						<DetailsRow
							label={commonStrings.fields.countryCode}
							value={store.fetchModelShelf.fetchedModel.address.countryCode}
						/>
						<DetailsRow
							label={commonStrings.fields.state}
							value={store.fetchModelShelf.fetchedModel.address.state}
						/>
					</>}
			</CentralizedCard>
			{store.paginetedListShelf && (
				<ProductTable
					maxW={{ base:"100%", md:"75%", lg: "60%" }}
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
			<Flex alignItems="center" w="100%" pb={20}>
				<Button
					variant="outline"
					minW={{ base: "100%", md: 280 }}
					mx="auto"
					size="lg"
					mt={10}
					isLoading={store.loader.isLoading}
					onClick={goBack}
				>
					{strings.actions.back}
				</Button>
			</Flex>
		</>
	);
};

export default observer(Details);
