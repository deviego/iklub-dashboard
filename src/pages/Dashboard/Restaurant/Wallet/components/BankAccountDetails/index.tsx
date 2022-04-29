import React from "react";
import {
	Flex,
	IconButton,
	Tooltip,
} from "@chakra-ui/react";
import {
	CentralizedCard,
	DetailsRow,
} from "~/components";
import strings from "~/resources/strings";
import { EditIcon } from "@chakra-ui/icons";
import api from "~/resources/api";

interface IProps {
	bankAccount: api.BankAccount;
	onGoToEditRestaurant: () => void;
	title?: string;
}

export const BankAccountDetails: React.FC<IProps> = (props) => {
	const { bankAccount, onGoToEditRestaurant, title } = props;
	const commonStrings = strings.common;

	return (
		<CentralizedCard
			title={{
				text: title ? title : strings.restaurants.createOrEdit.bankAccountTitle(false),
				helper: (
					<Tooltip label={strings.common.edit}>
						<IconButton
							variant="icon"
							aria-label="Edit"
							size="lg"
							icon={<EditIcon w="24px" h="24px" />}
							onClick={onGoToEditRestaurant}
						/>
					</Tooltip>
				),
			}}
		>
			<DetailsRow
				label={commonStrings.fields.bankName}
				value={bankAccount.bankName}
			/>
			<DetailsRow
				label={commonStrings.fields.typeAccount}
				value={api.translateBankAccountType(bankAccount?.type)}
			/>
			<DetailsRow
				label={commonStrings.fields.bankCode}
				value={bankAccount.bankCode}
			/>
			<Flex
				w="100%"
				flexDirection={{
					sm: "column",
					md: "row",
				}}
				alignItems="center"
				justifyContent="space-between"
			>
				<DetailsRow
					label={commonStrings.fields.bankAccount}
					value={bankAccount.account}
					w={{
						sm: "100%",
						md: "45%",
					}}
					mb={{
						sm: 8,
						md: 0,
					}}
				/>
				{bankAccount.accountDv && (
					<DetailsRow
						label={commonStrings.fields.accountDv}
						value={bankAccount.accountDv}
						w={{
							sm: "100%",
							md: "45%",
						}}
					/>
				)}
			</Flex>
			<Flex
				w="100%"
				flexDirection={{
					sm: "column",
					md: "row",
				}}
				alignItems="center"
				justifyContent="space-between"
			>
				<DetailsRow
					label={commonStrings.fields.agency}
					value={bankAccount.agency}
					w={{
						sm: "100%",
						md: "45%",
					}}
					mb={{
						sm: 8,
						md: 0,
					}}
				/>
				{bankAccount.agencyDv && (
					<DetailsRow
						label={commonStrings.fields.agencyDigit}
						value={bankAccount.agencyDv}
						w={{
							sm: "100%",
							md: "45%",
						}}
					/>
				)}
			</Flex>
		</CentralizedCard>
	);
};
