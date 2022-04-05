import React from "react";
import { observer } from "mobx-react-lite";
import RDatePicker, { registerLocale } from "react-datepicker";
import {
	Input,
	InputProps,
	FormLabel,
	FormControl,
	FormControlProps,
	Flex,
} from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { CalendarIcon } from "@chakra-ui/icons";
import { InputGroup, InputRightElement } from "@chakra-ui/react";

import formatter from "~/resources/format";
registerLocale("ptBR", ptBR);

interface IProps extends FormControlProps {
	onChangeDate: (date: Date) => void;
	selectedDate: Date | null;
	inputProps?: InputProps;
	label?: string;
	calendarIcon?: boolean;
}

export const DatePicker: React.FC<IProps> = observer((props) => {
	const { onChangeDate, selectedDate, inputProps, label, calendarIcon, ...rest } = props;
	const formatedDate = selectedDate ? formatter.date(selectedDate) : "__/__/__";

	return (
		<FormControl {...rest}>
			{label && (
				<FormLabel
					fontSize="sm"
					color="primary.500"
					fontWeight="normal"
				>
					{label}
				</FormLabel>
			)}

			<RDatePicker
				locale={ptBR}
				dateFormat="dd/MM/yyyy"
				selected={selectedDate}
				onChange={onChangeDate}
				customInput={
					<InputGroup >
						<Input
							value={formatedDate}
							letterSpacing="2px"
							readOnly
							{...inputProps}
						/>
						{
							calendarIcon
							&& (
								<InputRightElement >
									<Flex backgroundColor="black"
										alignItems="center"
										justifyContent="center"
										h={9}
										borderBottomRadius={10}
										borderTopLeftRadius={10}
										w={10}
										position="relative"
										mb={1}
									>
										<CalendarIcon color="white" />
									</Flex>
								</InputRightElement>
							)
						}
					</InputGroup>
				}
			/>
		</FormControl>
	);

});
