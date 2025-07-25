import * as React from "react";

import {
	Box,
	Image,
} from "@chakra-ui/react";

import strings from "~/resources/strings";
import API from "~/resources/api";

import { DetailsRow, Label } from "..";

import imagePlaceholder from "~/assets/pick_image.svg";

import { AddressDetails } from "../AddressDetails";

interface IProps {
	user: API.User;
}

export const DetailsUser: React.FC<IProps> = (props) => {

	const { user } = props;

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
					src={user.image ? user.image.url : imagePlaceholder}
					rounded="lg"
				/>
			</Box>
			<DetailsRow
				label={commonStrings.fields.name}
				value={user.name}
			/>
			<DetailsRow
				label={commonStrings.fields.email}
				value={user.email}
			/>
			<DetailsRow
				label={commonStrings.fields.cpf}
				value={user.documentNumber || ""}
			/>
			<DetailsRow
				label={commonStrings.fields.phone}
				value={user.phone}
			/>
			{
				user.address &&
					<AddressDetails
						address={user.address}
					/>
			}
		</>
	);
};
