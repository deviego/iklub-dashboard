import { Button, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import strings from "~/resources/strings";
import {
	CentralizedCard,
	EnumSelect,
	TextInput,
} from "..";
import api from "../../resources/api";

type FieldType = "bankCode" | "agency" | "agencyDv" | "account" | "accountDv" | "documentNumber";

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
	type: {
		value: api.BankAccountType;
		setValue: (newValue: api.BankAccountType) => void;
	};
}

interface IProps {
	title: string;
	isLoading: boolean;
	formValues: FormValues;
	submit: {
		onClick: () => void;
		text: string;
		isLoading: boolean;
	};
}

export const BankForm: React.FC<IProps> = observer((props) => {

	const { title, isLoading, formValues, submit } = props;

	const commonStrings = strings.common;

	return (
		<CentralizedCard
			title={{
				text: title,
			}}
			button={(
				<Button
					minW={{ base: "100%", md: 280 }}
					size="lg"
					mt={10}
					isLoading={submit.isLoading}
					onClick={submit.onClick}
				>
					{submit.text}
				</Button>
			)}
		>
			<EnumSelect
				items={api.allValuesBankAccountType()}
				currentValue={formValues.type.value}
				label={commonStrings.fields.typeAccount}
				onChangeEnum={formValues.type.setValue}
				tranlateEnum={api.translateBankAccountType}
			/>
			<TextInput
				labelText={commonStrings.fields.bankCode}
				type="text"
				isDisabled={isLoading}
				errorText={formValues.field("bankCode").error}
				{...formValues.field("bankCode")}
			/>
			<TextInput
				labelText={commonStrings.fields.cnpj}
				type="text"
				isDisabled={isLoading}
				mask="99.999.999/9999-99"
				errorText={formValues.field("documentNumber").error}
				{...formValues.field("documentNumber")}
			/>
			<HStack m={0}>
				<TextInput
					boxProps={{ paddingY: 4, w: "100%" }}
					labelText={commonStrings.fields.bankAccount}
					type="text"
					isDisabled={isLoading}
					errorText={formValues.field("account").error}
					{...formValues.field("account")}
				/>
				<TextInput
					boxProps={{ paddingY: 4, w: "100%" }}
					labelText={commonStrings.fields.accountDv}
					type="text"
					isDisabled={isLoading}
					errorText={formValues.field("accountDv").error}
					{...formValues.field("accountDv")}
				/>
			</HStack>
			<HStack m={0}>
				<TextInput
					boxProps={{ paddingY: 4, w: "100%" }}
					labelText={commonStrings.fields.agency}
					type="text"
					isDisabled={isLoading}
					errorText={formValues.field("agency").error}
					{...formValues.field("agency")}
				/>
				<TextInput
					boxProps={{ paddingY: 4, w: "100%" }}
					labelText={commonStrings.fields.agencyDigit}
					type="text"
					isDisabled={isLoading}
					errorText={formValues.field("agencyDv").error}
					{...formValues.field("agencyDv")}
				/>
			</HStack>
		</CentralizedCard>
	);
});
