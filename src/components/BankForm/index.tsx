import { Button, Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React from "react";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import { IBankNameAndCode } from "~/pages/Dashboard/Restaurant/RestaurantProfile/store";
import strings from "~/resources/strings";
import {
	CentralizedCard,
	EnumSelect,
	TextInput,
} from "..";
import api from "../../resources/api";

type FieldType = "bankName" | "bankCode" | "agency" | "agencyDv" | "account" | "accountDv" | "documentNumber";

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
	toggleBank: (string: string) => void;
	getBankNamesAndCodes: IBankNameAndCode[];
}

export const BankForm: React.FC<IProps> = observer((props) => {

	const { title, isLoading, formValues, submit, toggleBank, getBankNamesAndCodes } = props;

	const commonStrings = strings.common;

	const { authStore } = useGlobalStore();

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
			<FormControl isDisabled={isLoading}>
				<FormLabel>{commonStrings.fields.bankName}</FormLabel>
				<Select
					onChange={(e) => toggleBank(e.target.value)}
					defaultValue={authStore.currentAdminUser?.restaurant?.bankAccount?.bankCode || undefined}
					bg="gray.100"
					color="primary.800"
				>
					{getBankNamesAndCodes.map((bank) => (
						<option aria-selected="true" key={bank.code} value={bank.code}>
							{commonStrings.fields.concatData(bank.code, bank.name)}
						</option>
					))}
				</Select>
			</FormControl>
			<EnumSelect
				items={api.allValuesBankAccountType()}
				currentValue={formValues.type.value}
				label={commonStrings.fields.typeAccount}
				onChangeEnum={formValues.type.setValue}
				tranlateEnum={api.translateBankAccountType}
			/>
			<TextInput
				labelText={commonStrings.fields.cnpj}
				type="text"
				isDisabled={isLoading}
				mask="99.999.999/9999-99"
				errorText={formValues.field("documentNumber").error}
				{...formValues.field("documentNumber")}
			/>
			<Flex
				flexDirection={{ base: "column", md: "row" }}
				justifyContent="space-between"
			>
				<TextInput
					boxProps={{ w: "100%" }}
					labelText={commonStrings.fields.bankAccount}
					type="text"
					w={{ base: "100%", md: "97%" }}
					isDisabled={isLoading}
					errorText={formValues.field("account").error}
					{...formValues.field("account")}
				/>
				<TextInput
					boxProps={{ w: "100%" }}
					labelText={commonStrings.fields.accountDv}
					type="text"
					w={{ base: "100%", md: "97%" }}
					isDisabled={isLoading}
					errorText={formValues.field("accountDv").error}
					{...formValues.field("accountDv")}
				/>
			</Flex>
			<Flex
				flexDirection={{ base: "column", md: "row" }}
				justifyContent="space-between"
			>
				<TextInput
					boxProps={{ w: "100%" }}
					labelText={commonStrings.fields.agency}
					type="text"
					w={{ base: "100%", md: "97%" }}
					isDisabled={isLoading}
					errorText={formValues.field("agency").error}
					{...formValues.field("agency")}
				/>
				<TextInput
					boxProps={{ w: "100%" }}
					labelText={commonStrings.fields.agencyDigit}
					type="text"
					w={{ base: "100%", md: "97%" }}
					isDisabled={isLoading}
					errorText={formValues.field("agencyDv").error}
					{...formValues.field("agencyDv")}
				/>
			</Flex>
		</CentralizedCard>
	);
});
