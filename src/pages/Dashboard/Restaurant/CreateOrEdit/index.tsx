import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";

import { RestaurantForm } from "~/components";

// import api from "~/resources/api";

import strings from "~/resources/strings";

import Store from "./store";

interface IParams {
	id?: string;
}

const CreateOrEdit: React.FC = () => {
	const pageStrings = strings.restaurants.createOrEdit;
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const onSuccess = () => {
		history.goBack();
	};

	const store = useLocalObservable(() => new Store(id));

	const onSubmit = () => {
		store.createOrEditRestaurant(onSuccess);
	};

	return (
		<>
			<RestaurantForm
				title={pageStrings.title(!!id)}
				isLoading={store.loader.isLoading}
				formValues={{
					field: store.formShelf.field,
					image: {
						pick: store.imageShelf.getPickerFields().pick,
						src: store.imageShelf.src,
					},
					state: {
						value: store.stateUF.value,
						setValue: store.stateUF.setValue,
					},
				}}
				submit={{
					onClick: onSubmit,
					text: commonStrings.buttons.confirmButton(!!id),
					isLoading: store.loader.isLoading,
				}}
			/>
		</>
	);
};

export default observer(CreateOrEdit);
