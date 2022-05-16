import React from "react";
import {
	Flex,
	VStack,
	Text,
	Center,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { Pagination, Fetchable, IPaginationProps } from "~/components";

import strings from "~/resources/strings";

export interface IProps<DataType>{
	data: DataType[];
	renderItem: (data: DataType, index?: number) => React.ReactElement;
	loading: boolean;
	paginantionProps?: IPaginationProps;
}

export const List = observer(<T,>(props: IProps<T>) => {
	const {
		data,
		loading,
		paginantionProps,
		renderItem,
	} = props;
	const componentStrings = strings.components.autoCompleteList;

	return (
		<Fetchable loading={loading}>
			<VStack
				spacing={4}
				maxH={300}
				overflowY="auto"
			>
				{data.map((item, index) => renderItem(item, index))}
			</VStack>

			{!data.length && (
				<Center>
					<Text>{componentStrings.empty}</Text>
				</Center>
			)}
			<Flex
				mt={4}
				px={6}
				alignItems="center"
				justifyContent="center"
			>
				{
					paginantionProps
						? <Pagination {...paginantionProps} />
						: null
				}
			</Flex>
		</Fetchable>
	);
});
