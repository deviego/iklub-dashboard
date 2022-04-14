import * as React from "react";

import {
	Box,
	Flex,
} from "@chakra-ui/react";

import strings from "~/resources/strings";
import API from "~/resources/api";

import { DetailsRow } from "..";

interface IProps {
	purchasedProduct: API.PurchasedProductWithoutUser;
}

export const DetailsBalance: React.FC<IProps> = (props) => {

	const { purchasedProduct } = props;

	const commonStrings = strings.common;

	return (
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
	);
};
