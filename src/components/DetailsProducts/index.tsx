import * as React from "react";

import strings from "~/resources/strings";
import API from "~/resources/api";
import {
	Box,
	Image,
} from "@chakra-ui/react";
import { DetailsRow, Label } from "..";
import imagePlaceholder from "../../../static/pick_image.svg";
import format from "~/resources/format";

interface IProps {
	product: API.PurchasedProduct;
}

export const DetailsProduct: React.FC<IProps> = (props) => {

	const { product } = props;

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
					src={product.product ? product.product.image?.url : imagePlaceholder}
					rounded="lg"
				/>
			</Box>
			<Box>
				<DetailsRow
					label={commonStrings.fields.name}
					value={product.product.title}
				/>
				<DetailsRow
					label={commonStrings.fields.price}
					value={format.currencyForBR(product.product.price)}
				/>
				<DetailsRow
					label={commonStrings.fields.totalAmountOfDoses}
					value={product.product.totalNumberOfDoses.toString()}
				/>
				<DetailsRow
					label={commonStrings.fields.description}
					value={product.product.description}
				/>
				<DetailsRow
					label={commonStrings.fields.createdAt}
					value={format.date(product.purchasedAt)}
				/>
			</Box>
		</>
	);
};
