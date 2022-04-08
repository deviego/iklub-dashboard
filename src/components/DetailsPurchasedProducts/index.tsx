import * as React from "react";

import {
	Box,
	Image,
} from "@chakra-ui/react";

import strings from "~/resources/strings";
import API from "~/resources/api";
import format from "~/resources/format";

import { DetailsRow, Label } from "..";

import imagePlaceholder from "../../../static/pick_image.svg";

interface IProps {
	purchasedProduct: API.PurchasedProduct;
}

export const DetailsPurchasedProduct: React.FC<IProps> = (props) => {

	const { purchasedProduct } = props;

	const commonStrings = strings.common;

	return (
		<>
			<Box>
				<Label fontWeight="bold" marginBottom={1}>
					{commonStrings.fields.photo}
				</Label>
				<Image
					width={120}
					height={120}
					backgroundColor="white"
					p={0}
					m={0}
					src={purchasedProduct.product ? purchasedProduct.product.image?.url : imagePlaceholder}
					rounded="lg"
				/>
			</Box>
			<Box>
				<DetailsRow
					label={commonStrings.fields.name}
					value={purchasedProduct.product.title}
				/>
				<DetailsRow
					label={commonStrings.fields.price}
					value={format.currencyForBR(purchasedProduct.product.price)}
				/>
				<DetailsRow
					label={commonStrings.fields.totalAmountOfDoses}
					value={purchasedProduct.product.totalNumberOfDoses.toString()}
				/>
				<DetailsRow
					label={commonStrings.fields.description}
					value={purchasedProduct.product.description}
				/>
				<DetailsRow
					label={commonStrings.fields.createdAt}
					value={format.date(purchasedProduct.purchasedAt)}
				/>
			</Box>
		</>
	);
};
