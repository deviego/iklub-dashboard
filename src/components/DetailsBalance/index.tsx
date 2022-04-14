import * as React from "react";

import { observer } from "mobx-react-lite";

import {
	Box,
	Button,
	Flex,
} from "@chakra-ui/react";

import strings from "~/resources/strings";
import API from "~/resources/api";

import { DetailsRow } from "..";
import { ConsumeCounter } from "../ConsumeCounter";

interface IConsumeCounterProps {
	isOpen: boolean;
	onChangeIsOpen: (newStatus: boolean) => void;
	quantity: number;
	onChangeQuantity: (newQuantity: number) => void;
	maxQuantity: number;
	onConfirm: () => void;
}

interface IProps {
	purchasedProduct: API.PurchasedProductWithoutUser;
	consumeCounterProps: IConsumeCounterProps;
}

export const DetailsBalance: React.FC<IProps> = observer((props) => {

	const {
		purchasedProduct,
		consumeCounterProps,
	} = props;

	const commonStrings = strings.common;
	const componentStrings = strings.components.detailsBalance;

	return (
		<>
			<Flex flexDirection={{ base: "column", xl: "row" }} justifyContent="space-between" >
				<Box w={{ base: "100%", xl: "30%" }}>
					<DetailsRow
						label={commonStrings.fields.availableDoses}
						value={(purchasedProduct.totalDoses - purchasedProduct.consumedDoses).toString()}
					/>
				</Box>
				<Box w={{ base: "100%", xl: "30%" }}>
					<DetailsRow
						label={commonStrings.fields.consumedDoses}
						value={purchasedProduct.consumedDoses.toString()}
					/>
				</Box>
				<Box w={{ base: "100%", xl: "30%" }}>
					<DetailsRow
						label={commonStrings.fields.totalAmountOfDoses}
						value={purchasedProduct.totalDoses.toString()}
					/>
				</Box>
			</Flex>
			<Button onClick={() => consumeCounterProps.onChangeIsOpen(true)}>
				{componentStrings.consumeDoses}
			</Button>
			<ConsumeCounter
				{...consumeCounterProps}
			/>
		</>
	);
});
