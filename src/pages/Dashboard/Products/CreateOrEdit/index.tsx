import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Box, useDisclosure } from "@chakra-ui/react";
import { observer, useLocalObservable } from "mobx-react-lite";

import {
	CentralizedCard,
	TextInput,
	ImagePicker,
	Label,
	MoneyInput,
	AutoCompleteModal,
	RestaurantCard,
} from "~/components";
import { useGlobalStore } from "~/contexts/useGlobalContext";

import strings from "~/resources/strings";

import Store from "./store";
import { useDebounce } from "~/hooks/useDebounce";

interface IParams {
	id?: string;
}

const CreateOrEdit: React.FC = () => {
	const pageStrings = strings.products;
	const commonStrings = strings.common;
	const { authStore } = useGlobalStore();
	const debounce = useDebounce();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const { id } = useParams<IParams>();
	const history = useHistory();

	const onSuccess = () => {
		history.goBack();
	};

	const store = useLocalObservable(() => new Store(id));

	const onSubmit = () => {
		if (authStore.currentAdminUser) {
			store.createOrEditRestaurant(onSuccess);
		}
	};

	return (
		<CentralizedCard
			title={{
				text: pageStrings.createOrEdit.title(!!store.id.value),
			}}
			button={
				<Button
					minW={{ base: "100%", md: 280 }}
					size="lg"
					mt={10}
					isLoading={store.loader.isLoading}
					onClick={onSubmit}
				>
					{pageStrings.createOrEdit.button(!!store.id.value)}
				</Button>
			}
		>
			<Box>
				<Label fontWeight="bold" marginBottom={1}>
					{commonStrings.fields.photo}
				</Label>
				<ImagePicker
					pickImage={store.imageShelf.getPickerFields().pick}
					src={store.imageShelf.src}
				/>
			</Box>
			<TextInput
				labelText={commonStrings.fields.title}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				errorText={store.formShelf.field("title").error}
				{...store.formShelf.field("title")}
			/>
			<TextInput
				labelText={commonStrings.fields.description}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				errorText={store.formShelf.field("description").error}
				{...store.formShelf.field("description")}
			/>
			<MoneyInput
				value={store.price.value.toString()}
				onChange={(value: string) => store.price.setValue(parseInt(value))}
			/>
			<TextInput
				labelText={commonStrings.fields.totalAmountOfDoses}
				labelProps={{ fontWeight: "bold" }}
				type="number"
				errorText={store.formShelf.field("totalNumberOfDoses").error}
				{...store.formShelf.field("totalNumberOfDoses")}
			/>
			{!id && (
				<TextInput
					labelText={commonStrings.fields.restaurant}
					onClick={onOpen}
					labelProps={{ fontWeight: "bold" }}
					isReadOnly
					value={store.selectedRestaurant.value ? store.selectedRestaurant.value.name : ""}
				/>
			)}
			<AutoCompleteModal
				isOpen={isOpen}
				onClose={onClose}
				header={
					<TextInput
						placeholder={strings.products.createOrEdit.searchRestaurant}
						my={5}
						onKeyUp={(e) => {
							const input = e.target as HTMLInputElement;
							debounce.clearTimer();
							debounce.setTimer(setTimeout(() => store.searchRestaurant.setValue(input.value), 500));
						}}
					/>
				}
				listProps={{
					data: store.restaurantPaginatedList.items,
					loading: store.restaurantPaginatedList.loader.isLoading,
					renderItem: (restaurant) => (
						<RestaurantCard
							key={restaurant.id}
							restaurant={restaurant}
							isSelected={(store.selectedRestaurant.value && store.selectedRestaurant.value.id === restaurant.id) || false}
							onClickCard={(item) => store.selectedRestaurant.setValue(item)}
						/>
					),
					paginantionProps: {
						currentPage: store.restaurantPaginatedList.page,
						hasNextPage: store.restaurantPaginatedList.hasNextPage,
						nextPage: store.restaurantPaginatedList.nextPage,
						prevPage: store.restaurantPaginatedList.previousPage,
					},
				}}
			/>
		</CentralizedCard>
	);
};

export default observer(CreateOrEdit);
