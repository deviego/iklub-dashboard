import React from "react";
import {
	Box,
	BoxProps,
	Input,
	InputGroup,
	InputLeftElement,
	TextProps,
} from "@chakra-ui/react";
import format from "../../resources/format";
import { Label } from "..";
import strings from "~/resources/strings";

interface IProps {
	value: string;
	onChange: (value: string) => void;
	helper?: string;
	boxProps?: BoxProps;
	labelProps?: TextProps;
	defaultValue?: string | null;
	isDisabled?: boolean;
}

export const MoneyInput: React.FC<IProps> = (props) => {

	const {
		value,
		onChange,
		defaultValue,
		isDisabled,
		labelProps,
		boxProps,
		helper,
	} = props;

	return (
		<Box {...boxProps} mb={5}>
			<Label
				marginBottom={1}
				helper={helper}
				fontWeight="bold"
				{...labelProps}
			>
				{strings.common.fields.price}
			</Label>
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
		</Box>
	);
};
