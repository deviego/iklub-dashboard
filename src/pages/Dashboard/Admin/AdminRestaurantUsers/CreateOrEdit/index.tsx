import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { useGlobalStore } from "~/contexts/useGlobalContext";

import {
	CentralizedCard,
	TextInput,
	AutoCompleteModal,
} from "~/components";
import strings from "~/resources/strings";
import Store from "./store";
import { useDebounce } from "~/hooks/useDebounce";
import API from "~/resources/api";

interface IParams {
	id?: string;
}

const CreateAdminRestaurantUsers: React.FC = () => {
	const pageStrings = strings.adminRestaurantUsers.createOrEdit;
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();
	const { isOpen, onClose, onOpen } = useDisclosure();
	const debounce = useDebounce();

	const { authStore } = useGlobalStore();

	const restaurantId = authStore.currentAdminUser?.restaurant?.id;

	const onSuccess = () => {
		history.goBack();
	};

	const store = useLocalObservable(() => new Store(restaurantId, id));

	const onSubmit = () => {
		store.createOrEditAdminRestaurantUser(onSuccess);
	};

	const onSelectRestaurant = (restaurant: API.Restaurant) => {
		store.restaurant.setValue(restaurant);
		onClose();
	};

	return (
		<>
			<CentralizedCard
				title={{
					text: pageStrings.titleRestaurantUser(!!id),
				}}
				button={(
					<Button
						minW={{ base: "100%", md: 280 }}
						size="lg"
						mt={10}
						isLoading={store.loader.isLoading}
						onClick={onSubmit}
					>
						{commonStrings.buttons.confirmButton(!!id)}
					</Button>
				)}
			>
				<TextInput
					labelText={commonStrings.fields.name}
					labelProps={{ fontWeight: "bold" }}
					type="text"
					isDisabled={store.loader.isLoading}
					errorText={store.formShelf.fieldError.getFieldError("name")}
					{...store.formShelf.field("name")}
				/>
				<TextInput
					labelText={commonStrings.fields.email}
					labelProps={{ fontWeight: "bold" }}
					type="email"
					isDisabled={store.loader.isLoading}
					errorText={store.formShelf.fieldError.getFieldError("email")}
					{...store.formShelf.field("email")}
				/>
				{
					!store.userId.value &&
						<>
							{
								!restaurantId &&
									<>
										<TextInput
											labelText={strings.adminRestaurantUsers.autocompleteLabel}
											onClick={onOpen}
											labelProps={{ fontWeight: "bold" }}
											value={store.restaurant.value?.name || ""}
											isReadOnly
										/>
										<AutoCompleteModal
											isOpen={isOpen}
											onClose={onClose}
											header={
												<TextInput
													placeholder={strings.adminRestaurantUsers.autocompletePlaceholder}
													onKeyUp={(e) => {
														const input = e.target as HTMLInputElement;
														debounce.clearTimer();
														debounce.setTimer(setTimeout(() => store.searchRestaurant.setValue(input.value), 500));
													}}
												/>
											}
											listProps={{
												data: store.autoCompleteRestaurant.items,
												loading: store.autoCompleteRestaurant.loader.isLoading,
												renderItem: (item) => (
													<Text
														key={item.id}
														onClick={() => onSelectRestaurant(item)}
													>
														{item.name}
													</Text>
												),
												paginantionProps: {
													currentPage: store.autoCompleteRestaurant.page,
													nextPage: store.autoCompleteRestaurant.nextPage,
													prevPage: store.autoCompleteRestaurant.previousPage,
													hasNextPage: store.autoCompleteRestaurant.hasNextPage,
												},
											}}
										/>
									</>
							}
							<TextInput
								labelText={commonStrings.fields.password}
								labelProps={{ fontWeight: "bold" }}
								type="password"
								isDisabled={store.loader.isLoading}
								errorText={store.formShelf.fieldError.getFieldError("password")}
								{...store.formShelf.field("password")}
							/>
						</>
				}
			</CentralizedCard>
		</>
	);
};

export default observer(CreateAdminRestaurantUsers);
