import React from "react";
import { Text, Flex, StackProps, Stack } from "@chakra-ui/layout";
import { AiOutlineFilter } from "react-icons/ai";
import { observer } from "mobx-react-lite";

import strings from "~/resources/strings";
import { DatePicker } from "~/components";

interface IProps extends StackProps {
	selectedDate: Date | null;
	onChangeSelectedDate: (date: Date) => void;

}

export const DateFilter: React.FC<IProps> = observer((props) => {

	const { selectedDate, onChangeSelectedDate, ...rest } = props;

	const componentStrings = strings.components.checkinPeriodFilter;

	return (
		<Stack
			w="40%"
			p={3}
			maxW="3xl"
			direction="row"
			wrap="wrap"
			alignItems="center"
			justifyContent={{ base: "space-evenly", md: "space-around" }}
			borderBottomRadius={20}
			borderTopLeftRadius={20}
			mb={{ base: 5, lg: 0 }}
			bg="#FFFFFF"
			{...rest}
		>
			<Flex>
				<AiOutlineFilter
					size={25}
					color="black"
				/>
				<Text
					px={2}
					textColor="primary.500"
					fontWeight="bold"
					textAlign="center"
					fontSize="md"
				>
					{componentStrings.filterDate}
				</Text>
			</Flex>

			<Flex
				alignItems="center"
				justifyContent="center"
			>
				<DatePicker
					selectedDate={selectedDate}
					onChangeDate={onChangeSelectedDate}
					calendarIcon
					inputProps={{ h: "35px", textAlign: "center" }}
					maxW="180"
				/>
			</Flex>

		</Stack>
	);
},
);
