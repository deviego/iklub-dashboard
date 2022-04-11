import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import {
	Button,
} from "@chakra-ui/react";

import {
	CentralizedCard,
	DetailsPurchasedProduct,
	DetailsUser,
} from "~/components";

import strings from "~/resources/strings";

import Store from "./store";

interface IParams {
	id?: string;
}

const Details: React.FC = () => {
	const pageStrings = strings.purchasedProducts;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const store = useLocalObservable(() => new Store(id || ""));

	const goBack = () => history.goBack();

	return (
		<>
			<CentralizedCard
				title={{
					text: pageStrings.details.titleProduct,
				}}
			>
				{store.fetchModelShelf.model.value &&
					<DetailsPurchasedProduct
						purchasedProduct={store.fetchModelShelf.fetchedModel}
					/>}
			</CentralizedCard>

			<CentralizedCard
				title={{
					text: pageStrings.details.titleUser,
				}}
				button={(
					<Button
						variant="outline"
						minW={{ base: "100%", md: 280 }}
						size="lg"
						mt={10}
						isLoading={store.fetchModelShelf.loader.isLoading}
						onClick={goBack}
					>
						{strings.actions.back}
					</Button>
				)}
			>
				{store.fetchModelShelf.model.value &&
					<DetailsUser
						user={store.fetchModelShelf.fetchedModel.user}
					/>}
			</CentralizedCard>
		</>
	);
};

export default observer(Details);
