import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Button } from "@chakra-ui/react";

import {
	CentralizedCard,
	TextInput,
} from "~/components";
import strings from "~/resources/strings";
import Store from "./store";

interface IParams {
	restaurantId: string;
	userId?: string;
}

const CreateOrEdit: React.FC = () => {
	const pageStrings = strings.adminUsers.createOrEdit;
	const commonStrings = strings.common;

	const { restaurantId, userId } = useParams<IParams>();
	const history = useHistory();

	const onSuccess = () => {
		history.goBack();
	};

	const store = useLocalObservable(() => new Store(restaurantId, userId || ""));

	const onSubmit = () => {
		store.createOrEditUser(onSuccess);
	};

	return (
		<CentralizedCard
			title={{
				text: pageStrings.title(!!userId),
			}}
			button={(
				<Button
					minW={{ base: "100%", md: 280 }}
					size="lg"
					mt={10}
					isLoading={store.loader.isLoading}
					onClick={onSubmit}
				>
					{commonStrings.buttons.confirmButton(!!userId)}
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
			{!userId && (
				<TextInput
					labelText={commonStrings.fields.password}
					labelProps={{ fontWeight: "bold" }}
					w={{ base: "100%", md: "60%" }}
					type="password"
					isDisabled={store.loader.isLoading}
					errorText={store.formShelf.fieldError.getFieldError("password")}
					{...store.formShelf.field("password")}
				/>
			)}
		</CentralizedCard>
	);
};

export default observer(CreateOrEdit);
