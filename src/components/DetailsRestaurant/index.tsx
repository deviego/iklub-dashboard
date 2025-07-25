import * as React from "react";

import strings from "~/resources/strings";
import API from "~/resources/api";
import {
	Box,
	Image,
} from "@chakra-ui/react";
import { AddressDetails, DetailsRow, Label } from "..";
import imagePlaceholder from "~/assets/pick_image.svg";

interface IProps {
	restaurant: API.Restaurant;
	dynamicLink: string;
}

export const DetailsRestaurant: React.FC<IProps> = (props) => {

	const { restaurant, dynamicLink } = props;

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
					src={restaurant.image ? restaurant.image.url : imagePlaceholder}
					rounded="lg"
				/>
			</Box>
			<Box>
				<DetailsRow
					label={commonStrings.fields.link}
					value={dynamicLink}
				/>
				<DetailsRow
					label={commonStrings.fields.name}
					value={restaurant.name}
				/>
				<DetailsRow
					label={commonStrings.fields.corporateName}
					value={restaurant.corporateName}
				/>
				<DetailsRow
					label={commonStrings.fields.documentNumber}
					value={restaurant.documentNumber}
				/>
				<AddressDetails
					address={restaurant.address}
				/>
			</Box>
		</>
	);
};
