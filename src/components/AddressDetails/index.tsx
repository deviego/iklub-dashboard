import * as React from "react";

import { DetailsRow } from "..";

import strings from "~/resources/strings";
import API from "~/resources/api";
import { Box, Center, HStack } from "@chakra-ui/react";

interface IProps {
	address: API.Address;
}

export const AddressDetails: React.FC<IProps> = (props) => {

	const { address } = props;

	const commonStrings = strings.common;

	return (
		<Center w="100%" flexDir="column">
			<Box w="100%">
				<DetailsRow
					label={commonStrings.fields.zipcode}
					value={address.zipcode}
				/>
				<HStack m={0}>
					<Box w={{base: "50%", md: "70%"}}>
						<DetailsRow
							label={commonStrings.fields.street}
							value={address.street}
						/>
					</Box>
					<Box w={{base: "50%", md: "30%"}}>
						<DetailsRow
							label={commonStrings.fields.streetNumber}
							value={address.streetNumber}
						/>
					</Box>
				</HStack>
				{address.complementary &&
					<DetailsRow
						label={commonStrings.fields.complementary}
						value={address.complementary}
					/>}
				{address.neighborhood &&
					<DetailsRow
						label={commonStrings.fields.neighborhood}
						value={address.neighborhood}
					/>}
				<DetailsRow
					label={commonStrings.fields.city}
					value={address.city}
				/>
				<DetailsRow
					label={commonStrings.fields.state}
					value={address.state}
				/>
			</Box>
		</Center>
	);
};


