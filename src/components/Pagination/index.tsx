import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

export interface IProps {
	currentPage: number;
	prevPage: () => void;
	nextPage: () => void;
	hasNextPage: boolean;
}

export const Pagination: React.FC<IProps> = (props) => {
	const {
		currentPage,
		prevPage,
		nextPage,
		hasNextPage,
	} = props;
	return (
		<Flex alignItems="center">
			<IconButton
				variant="icon"
				color="primary.500"
				disabled={currentPage === 0}
				size="xs"
				aria-label="Left Icon"
				icon={<ChevronLeftIcon />}
				onClick={prevPage}
			/>
			<Text mx={3}>{currentPage+1}</Text>
			<IconButton
				variant="icon"
				color="primary.500"
				disabled={!hasNextPage}
				size="xs"
				aria-label="Right Icon"
				icon={<ChevronRightIcon />}
				onClick={nextPage}
			/>
		</Flex>
	);
};
