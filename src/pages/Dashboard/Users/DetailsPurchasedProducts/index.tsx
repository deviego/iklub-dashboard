import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { observer, useLocalObservable } from "mobx-react-lite";
import { Button } from "@chakra-ui/react";

import {
	CentralizedCard,
	DetailsPurchasedProduct,
	DetailsRow,
} from "~/components";

import strings from "~/resources/strings";

import Store from "./store";

interface IParams {
	id?: string;
}

const DetailsPurchasedProducts: React.FC = () => {
	const commonStrings = strings.common;

	const { id } = useParams<IParams>();
	const history = useHistory();

	const store = useLocalObservable(() => new Store(id || ""));

	const goBack = () => history.goBack();

	return (
		<>
			<CentralizedCard
				title={{
					text: commonStrings.detailsTitle,
				}}
			>
				{store.fetchModelShelf.model.value &&
					<DetailsPurchasedProduct
						purchasedProduct={store.fetchModelShelf.fetchedModel}
					/>}
			</CentralizedCard>
			<CentralizedCard
				title={{
					text: commonStrings.fields.statusDoses,
				}}
				button={
					<Button
						variant="outline"
						minW={{ base: "100%", md: 280 }}
						size="lg"
						isLoading={store.fetchModelShelf.loader.isLoading}
						onClick={goBack}
					>
						{strings.actions.back}
					</Button>
				}
			>
				{store.fetchModelShelf.model.value &&
					<>
						<DetailsRow
							label={commonStrings.fields.consumedDoses}
							value={store.fetchModelShelf.fetchedModel.consumedDoses.toString()}
						/>
						<DetailsRow
							label={commonStrings.fields.availableDoses}
							value={(store.fetchModelShelf.fetchedModel.totalDoses - store.fetchModelShelf.fetchedModel.consumedDoses).toString()}
						/>
					</>}
			</CentralizedCard>
		</>
	);
};

export default observer(DetailsPurchasedProducts);
