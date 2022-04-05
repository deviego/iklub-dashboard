import React from "react";
import {
	Box,
	Center,
	CenterProps,
	HStack,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { TextInput, EnumSelect } from "..";

import strings from "~/resources/strings";
import api from "~/resources/api";

export type AddressField =  "zipcode" | "street" | "streetNumber" | "complementary" | "neighborhood" | "city" | "countryCode" | "state";


interface FormValues {
	field: (field: AddressField) => {
		name: AddressField;
		onChange: (element: {
			target: {
				value: string;
			};
		}) => void;
		value: string;
		error: string | null;
	};
	state: {
		value: string;
		setValue: (value: api.StateUF) => void;
	};
}

interface IProps extends CenterProps {
	formValues: FormValues;
	isLoading: boolean;
}


export const AddressForm: React.FC<IProps> = observer((props) => {

	const commonStrings = strings.common;

	const { isLoading, formValues, ...rest } = props;

	return (
		<Center w="100%" flexDir="column" {...rest}>
			<Box w="100%">
				<TextInput
					labelText={commonStrings.fields.zipcode}
					labelProps={{ fontWeight: "bold" }}
					type="text"
					isDisabled={isLoading}
					errorText={formValues.field("zipcode").error}
					{...formValues?.field("zipcode")}
					mask="99999-999"
				/>
				<TextInput
					labelText={commonStrings.fields.neighborhood}
					labelProps={{ fontWeight: "bold" }}
					type="text"
					isDisabled={isLoading}
					errorText={formValues?.field("neighborhood").error}
					{...formValues?.field("neighborhood")}
				/>
				<HStack m={0}>
					<TextInput
						boxProps={{ w: "100%" }}
						labelText={commonStrings.fields.street}
						labelProps={{ fontWeight: "bold" }}
						type="text"
						isDisabled={isLoading}
						errorText={formValues?.field("street").error}
						{...formValues?.field("street")}
					/>
					<TextInput
						mb={7}
						boxProps={{ w: "50%"}}
						labelText={commonStrings.fields.streetNumber}
						labelProps={{ fontWeight: "bold" }}
						type="text"
						isDisabled={isLoading}
						errorText={formValues?.field("streetNumber").error}
						{...formValues?.field("streetNumber")}
					/>
				</HStack>
				<TextInput
					labelText={commonStrings.fields.complementary}
					labelProps={{ fontWeight: "bold" }}
					type="text"
					isDisabled={isLoading}
					errorText={formValues?.field("complementary").error}
					{...formValues?.field("complementary")}
				/>
				<TextInput
					labelText={commonStrings.fields.city}
					labelProps={{ fontWeight: "bold" }}
					type="text"
					isDisabled={isLoading}
					errorText={formValues?.field("city").error}
					{...formValues?.field("city")}
				/>
				<EnumSelect
					items={api.allValuesStateUF()}
					currentValue={formValues.state.value}
					label={commonStrings.fields.state}
					onChangeEnum={formValues.state.setValue}
					tranlateEnum={api.translateStateUF}
				/>
			</Box>
		</Center>
	);
});
