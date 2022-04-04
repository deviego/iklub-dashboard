import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	Button,
	Box,
} from "@chakra-ui/react";
import {
	AddressForm,
	CentralizedCard,
	ImagePicker,
	Label,
	TextInput,
} from "~/components";
import strings from "~/resources/strings";
import Store from "./store";

interface IParams {
	id?: string;
}

const Edit: React.FC = () => {
	const pageStrings = strings.users.edit;
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const onSuccess = () => {
		history.goBack();
	};

	const store = useLocalObservable(() => new Store(id));

	const onSubmit = () => {
		store.EditUser(onSuccess);
	};

	return (
		<CentralizedCard
			title={{
				text: pageStrings.title,
			}}
			button={(
				<Button
					w="100%"
					maxW={280}
					size="lg"
					mt={10}
					isLoading={store.loader.isLoading}
					onClick={onSubmit}
				>
					{commonStrings.buttons.confirmButton()}
				</Button>
			)}
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
				labelText={commonStrings.fields.name}
				labelProps={{fontWeight: "bold"}}
				type="text"
				isDisabled={store.loader.isLoading}
				errorText={store.formShelf.fieldError.getFieldError("name")}
				{...store.formShelf.field("name")}
			/>
			<TextInput
				labelText={commonStrings.fields.email}
				labelProps={{fontWeight: "bold"}}
				type="email"
				isDisabled={store.loader.isLoading}
				errorText={store.formShelf.fieldError.getFieldError("email")}
				{...store.formShelf.field("email")}
			/>
			<TextInput
				labelText={commonStrings.fields.phone}
				labelProps={{fontWeight: "bold"}}
				type="text"
				isDisabled={store.loader.isLoading}
				mask="99 999999999"
				errorText={store.formShelf.fieldError.getFieldError("phone")}
				{...store.formShelf.field("phone")}
			/>
			<AddressForm
				formValues={{
					field: store.formShelf.field,
				}}
				isLoading={store.loader.isLoading}
				disableForm={store.disableForm.value}
			/>
		</CentralizedCard>
	);
};

export default observer(Edit);
