import * as React from "react";

import strings from "~/resources/strings";
import API from "~/resources/api";
import {
	Box,
	Image,
} from "@chakra-ui/react";
import { AddressDetails, DetailsRow, Label } from "..";
import imagePlaceholder from "../../../static/pick_image.svg";

interface IProps {
	formRestaurant: API.Restaurant;
}

export const DetailsForm: React.FC<IProps> = (props) => {

	const { formRestaurant } = props;

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
					src={formRestaurant.image ?formRestaurant.image.url : imagePlaceholder}
					rounded="lg"
				/>
			</Box>
			<Box>
				<DetailsRow
					label={commonStrings.fields.name}
					value={formRestaurant.name}
				/>
				<DetailsRow
					label={commonStrings.fields.corporateName}
					value={formRestaurant.corporateName}
				/>
				<DetailsRow
					label={commonStrings.fields.documentNumber}
					value={formRestaurant.documentNumber}
				/>
				<AddressDetails
					address={formRestaurant.address}
				/>
			</Box>
		</>
	);
};
