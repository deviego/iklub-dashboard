import React from "react";
import { observer } from "mobx-react-lite";
import {
	Box,
	BoxProps,
	Input,
	InputProps,
	FormErrorMessage,
	FormControl,
	InputGroup,
	InputLeftElement,
	TextProps,
} from "@chakra-ui/react";
import { Label } from "../";
import InputMask from "react-input-mask";

interface IProps extends Omit<InputProps, "value"> {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	labelText?: string;
	value?: string | string[];
	helper?: string;
	boxProps?: BoxProps;
	labelProps?: TextProps;
	mask?: string;
	errorText?: string | null;
	prefix?: string;
}

export const TextInput: React.FC<IProps> = observer((props) => {
	const {
		onChange,
		labelText,
		helper,
		boxProps,
		labelProps,
		value,
		mask,
		errorText,
		prefix,
		...rest
	} = props;

	return (
		<Box {...boxProps}>
			<FormControl isInvalid={!!errorText} position="relative">
				<Label
					marginBottom={1}
					helper={helper}
					{...labelProps}
				>
					{labelText}
				</Label>
				{prefix ? (
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							color="primary.700"
						>
							{prefix}
						</InputLeftElement>
						<Input
							onChange={onChange}
							value={value}
							as={InputMask}
							mask={mask}
							borderWidth={1}
							borderColor={errorText ? "red.500" : undefined}
							error={errorText}
							{...rest}
						/>
					</InputGroup>
				) : (
					<>
						<Input
							onChange={onChange}
							value={value}
							as={InputMask}
							mask={mask}
							borderWidth={1}
							borderColor={errorText ? "red.500" : undefined}
							error={errorText}
							{...rest}
						/>
						<FormErrorMessage
							position="absolute"
							bottom={-6}
						>
							{errorText}
						</FormErrorMessage>
					</>
				)}
			</FormControl>
		</Box>
	);
});
