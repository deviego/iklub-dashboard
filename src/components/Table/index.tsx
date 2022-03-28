import React from "react";
import {
	Table as CTable,
	Thead,
	Tbody,
	Th,
	Tr,
	Flex,
	Heading,
	Button,
	BoxProps,
	Box,
} from "@chakra-ui/react";

import { Label, Card, Pagination, Loading } from "../";
import strings from "~/resources/strings";

interface IProps<DataType> extends BoxProps {
	data: DataType[];
	headers: string[];
	renderRow: (item: DataType, index: number) => React.ReactElement | null;
	loading: boolean;
	emptyMessage: string;
	currentPage: number;
	prevPage: () => void;
	nextPage: () => void;
	hasNextPage: boolean;
	onAdd?: () => void;
	addButtonText?: string;
	addButtonLoading?: boolean;
	tableTitle?: string;
	headerFilter?: JSX.Element;
	isCard?: boolean;
}

export const Table = <DataType,>(props: IProps<DataType>) => {
	const {
		data,
		headers,
		renderRow,
		loading,
		emptyMessage,
		currentPage,
		prevPage,
		nextPage,
		hasNextPage,
		tableTitle,
		onAdd,
		addButtonText,
		addButtonLoading,
		headerFilter,
		isCard,
		...rest
	} = props;

	return (
		<Flex
			w="100%"
			flexDir="column"
			alignItems="center"
		>
			{tableTitle && (
				<Heading
					w="100%"
					maxW={{ base:"100%", md: isCard ? "100%" : "75%" }}
					variant="secondary"
					size="md"
					color="primary.500"
					mb={3}
				>
					{tableTitle}
				</Heading>
			)}
			<Box mb={3}>
				{headerFilter && (headerFilter)}
			</Box>
			<Card
				d="initial"
				w="100%"
				maxW={{ base:"100%", md: isCard ? "100%" : "75%" }}
				px={0}
				borderRadius={12}
				boxShadow={isCard ? 0 : "lg"}
				bg="white"
				{...rest}
			>
				<Box
					maxHeight={{ base: 450, md: 600 }}
					overflowX="auto"
				>
					{loading || !data ? (
						<Flex my={5} w="100%" justifyContent="center">
							<Loading />
						</Flex>
					) : data.length < 1 ? (
						<Flex
							my={5}
							w="100%"
							justifyContent="center"
							minH={300}
							alignItems="center"
						>
							<Heading size="md" fontWeight="bold">
								{emptyMessage}
							</Heading>
						</Flex>
					) : (
						<CTable
							variant="simple"
							ml="auto"
							height="100%"
						>
							<Thead
								borderBottomColor="primary.500"
								borderBottomWidth={2}
							>

								<Tr>
									{headers.map((header, index) => (
										<Th key={index}>
											<Label
												fontWeight="bold"
												color="primary.500"
											>
												{header}
											</Label>
										</Th>
									))}
								</Tr>
							</Thead>
							<Tbody>
								{data.map((dataItem, index) => renderRow(dataItem, index))}
							</Tbody>
						</CTable>
					)}
				</Box>
				<Flex
					py={4}
					px={6}
					alignItems="center"
					justifyContent="flex-end"
				>
					<Pagination
						currentPage={currentPage}
						prevPage={prevPage}
						nextPage={nextPage}
						hasNextPage={hasNextPage}
					/>
				</Flex>
			</Card>
			{onAdd && (
				<Button
					w="100%"
					maxW={360}
					size="lg"
					mt={10}
					onClick={onAdd}
					isLoading={addButtonLoading}
					mb={isCard ? 10 : 0}
				>
					{addButtonText || strings.actions.add}
				</Button>
			)}
		</Flex>
	);
};
