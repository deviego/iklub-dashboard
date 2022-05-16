import React from "react";
import { observer } from "mobx-react-lite";
import {
	Select,
	SelectProps,
	FormControl,
	FormLabel,
	FormControlProps,
} from "@chakra-ui/react";

interface IProps<EnumType> extends SelectProps {
	label?: string;
	tranlateEnum: (item: EnumType) => string;
	onChangeEnum: (value: EnumType) => void;
	currentValue: EnumType;
	items: EnumType[];
	formProps?: FormControlProps;
	disabled?: boolean;
}

export const EnumSelect = observer(<EnumType extends string>(props: IProps<EnumType>) => {
	const {
		tranlateEnum,
		onChangeEnum,
		currentValue,
		formProps,
		items,
		label,
		disabled,
		...rest
	} = props;

	React.useEffect(() =>{}, [currentValue]);

	return (
		<FormControl {...formProps}>
			<FormLabel
				fontWeight="bold"
			>
				{label}
			</FormLabel>
			<Select
				isDisabled={disabled}
				bg="gray.100"
				color="primary.800"
				{...rest}
				value={currentValue}
				onChange={(e) => {
					const value = e.target.value as EnumType;
					onChangeEnum(value);
				}}
			>
				{items.map((item, index) => (
					<option
						key={`${item}-${index}`}
						value={item}
					>
						{tranlateEnum(item)}
					</option>
				))}
			</Select>
		</FormControl>
	);
});
