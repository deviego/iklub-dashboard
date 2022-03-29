import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Button } from "@chakra-ui/react";
import strings from "~/resources/strings";
import {
	CentralizedCard,
	TextInput,
	Label,
	ImagePicker,
} from "..";

type FieldType = "name" | "corporateName" | "documentNumber" |  "zipcode" | "street" | "streetNumber" | "complementary" | "neighborhood" | "city" | "countryCode" | "state";

interface FormValues {
	field: (field: FieldType) => {
		name: FieldType;
		onChange: (element: {
			target: {
				value: string;
			};
		}) => void;
		value: string;
		error: string | null;
	};
	image: {
		pick: () => void;
		src: string | null;
	};
}

interface IProps {
	title: string;
	isLoading: boolean;
	formValues: FormValues;
	isProfile?: boolean;
	submit?: {
		onClick: () => void;
		text: string;
		isLoading: boolean;
	};

}

export const RestaurantForm: React.FC<IProps> = observer((props) => {

	const { title, isLoading, formValues, submit } = props;

	const commonStrings = strings.common;

	return (
		<CentralizedCard
			title={{
				text: title,
			}}
			button={(
				submit ?
					<Button
						minW={{ base: "100%", md: 280 }}
						size="lg"
						mt={10}
						isLoading={submit.isLoading}
						onClick={submit.onClick}
					>
						{submit.text}
					</Button>
					:
					undefined
			)}
		>
			<Box>
				<Label fontWeight="bold" marginBottom={1}>
					{commonStrings.fields.photo}
				</Label>
				<ImagePicker
					pickImage={formValues.image.pick}
					src={formValues.image.src}
				/>
			</Box>
			<TextInput
				labelText={commonStrings.fields.name}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("name").error}
				{...formValues?.field("name")}
			/>
			<TextInput
				labelText={commonStrings.fields.corporateName}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("corporateName").error}
				{...formValues?.field("corporateName")}
			/>
			<TextInput
				labelText={commonStrings.fields.documentNumber}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("documentNumber").error}
				{...formValues?.field("documentNumber")}
				mask="99999999/9999-99	"
			/>
			<TextInput
				labelText={commonStrings.fields.zipcode}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("zipcode").error}
				{...formValues?.field("zipcode")}
				mask="99999-999"
			/>
			<TextInput
				labelText={commonStrings.fields.street}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("street").error}
				{...formValues?.field("street")}
			/>
			<TextInput
				labelText={commonStrings.fields.streetNumber}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("streetNumber").error}
				{...formValues?.field("streetNumber")}
			/>
			<TextInput
				labelText={commonStrings.fields.complementary}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("complementary").error}
				{...formValues?.field("complementary")}
			/>
			<TextInput
				labelText={commonStrings.fields.neighborhood}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("neighborhood").error}
				{...formValues?.field("neighborhood")}
			/>
			<TextInput
				labelText={commonStrings.fields.city}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("city").error}
				{...formValues?.field("city")}
			/>
			<TextInput
				labelText={commonStrings.fields.countryCode}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("countryCode").error}
				{...formValues?.field("countryCode")}
			/>
			<TextInput
				labelText={commonStrings.fields.state}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("state").error}
				{...formValues?.field("state")}
			/>
		</CentralizedCard>
	);
});
