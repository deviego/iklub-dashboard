import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Box } from "@chakra-ui/react";
import { observer, useLocalObservable } from "mobx-react-lite";

import {
	CentralizedCard,
	TextInput,
	ImagePicker,
	Label,
	MoneyInput,
} from "~/components";
import { useGlobalStore } from "~/contexts/useGlobalContext";

import strings from "~/resources/strings";

import Store from "./store";

interface IParams {
	id?: string;
}

const CreateOrEdit: React.FC = () => {
	const pageStrings = strings.products;
	const commonStrings = strings.common;
	const { authStore } = useGlobalStore();

	const { id } = useParams<IParams>();
	const history = useHistory();

	const onSuccess = () => {
		history.goBack();
	};

	const store = useLocalObservable(() => new Store(id));

	const onSubmit = () => {
		if (authStore.currentAdminUser) {
			store.createOrEditRestaurant(authStore.currentAdminUser, onSuccess);
		}
	};

	React.useEffect(() => {
		if (authStore.currentAdminUser && store.id.value) {
			const isAdmin = !authStore.currentAdminUser.restaurant;
			store.getProduct(store.id.value, isAdmin);
		}
	}, [authStore.currentAdminUser]);
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
		</CentralizedCard>
	);
};

export default observer(CreateOrEdit);
