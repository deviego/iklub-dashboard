import React from "react";
import { observer } from "mobx-react-lite";
import { Box, Button } from "@chakra-ui/react";
import strings from "~/resources/strings";
import {
	CentralizedCard,
	Label,
	TextInput,
} from "..";

type FieldType = "name" | "documentNumber" |  "zipcode" | "street" | "streetNumber" | "complementary" | "neighborhood" | "city";

interface FormValues {
	field: (field: FieldType) => {
		name: FieldType;
		documentNumber: FieldType;
		onChange: (element: {
			target: {
				value: string;
			};
		}) => void;
		value: string;
		error: string | null;
	};
}

interface IProps {
	title: string;
	isLoading: boolean;
	formValues?: FormValues;
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
			</Box>
			<TextInput
				labelText={commonStrings.fields.name}
				labelProps={{ fontWeight: "bold" }}
				type="text"
				isDisabled={isLoading}
				errorText={formValues?.field("name").error}
				{...formValues?.field("name")}
			/>
		</CentralizedCard>
	);
});
