import React from "react";
import {
	Input,
	InputGroup,
	InputLeftElement,
} from "@chakra-ui/react";
import format from "../../resources/format";

interface IProps {
	value: string;
	onChange: (value: string) => void;
	defaultValue?: string | null;
	isDisabled?: boolean;
}

export const MoneyInput: React.FC<IProps> = (props) => {

	const {
		value,
		onChange,
		defaultValue,
		isDisabled,
	} = props;

	return (
		<InputGroup>
			<InputLeftElement
				pointerEvents="none"
				color="primary.700"
			>
				R$
			</InputLeftElement>
			<Input
				minW={150}
				isDisabled={isDisabled}
				name="price"
				value={defaultValue || format.decimal(Number(value))}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					const formatedValue = format.cleanDecimal(e.currentTarget.value);
					onChange(formatedValue);
				}}
			/>
		</InputGroup>
	);
};
