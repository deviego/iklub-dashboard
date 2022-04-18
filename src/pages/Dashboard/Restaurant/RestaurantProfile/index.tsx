import React from "react";
import { useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";

import { RestaurantForm } from "~/components";

import strings from "~/resources/strings";

import Store from "./store";

import { useGlobalStore } from "~/contexts/useGlobalContext";

interface IParams {
	id: string;
}

const RestaurantProfile: React.FC = () => {
	const pageStrings = strings.restaurantProfile;
	const commonStrings = strings.common;

	const { authStore } = useGlobalStore();

	const { id } = useParams<IParams>();

	const store = useLocalObservable(() => new Store(id));

	const onSubmitProfile = () => {
		store.EditMyRestaurant(() => authStore.getCurrentAdminUser());
	};

	return (
		<>
			<RestaurantForm
				isProfile
				title={pageStrings.title}
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
					onClick: onSubmitProfile,
					text: commonStrings.buttons.confirmButton(!!id),
					isLoading: store.loader.isLoading,
				}}
			/>
		</>
	);
};

export default observer(RestaurantProfile);
