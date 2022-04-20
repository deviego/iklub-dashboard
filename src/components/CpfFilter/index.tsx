import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { TextInput } from "../TextInput";
import strings from "~/resources/strings";

interface IProps {
	documentNumber: string;
	onChangeDocumentNumber: (newValue: string) => void;
	onConfirm: () => void;
}

export const CpfFilter: React.FC<IProps> = (props) => {
	const {
		documentNumber,
		onChangeDocumentNumber,
		onConfirm,
	} = props;

	return (
		<Flex
			flexDir="row"
			w={{
				sm: "100%",
				md: "75%",
			}}
			mx={{
				sm: 0,
				md: "auto",
			}}
			justifyContent={{
				base: "center",
				md:"flex-start",
			}}
		>
			<TextInput
				type="text"
				mask="999.999.999-99"
				value={documentNumber}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeDocumentNumber(e.target.value)}
				placeholder={strings.components.cpfFilter.searchByCpfPlaceholder}
				borderRadius="0.375rem"
				py={5}
			/>
			<Button
				onClick={onConfirm}
				w={{
					sm: "20%",
					md: "25%",
				}}
				mx={2}
				my={1}
			>
				{strings.actions.search}
			</Button>

		</Flex>
	);
};
