import React from "react";
import { Flex, Stack, Heading } from "@chakra-ui/react";

import {
	Card,
} from "~/components";

interface IProps {
	title?: {
		text: string;
		helper?: React.ReactElement;
	};
	button?: React.ReactElement;
	isTable?: boolean;
}

export const CentralizedCard: React.FC<IProps> = (props) => {
	const {
		title,
		button,
		children,
		isTable,
	} = props;

	return (
		<Flex
			w="100%"
			flexDirection="column"
			alignItems="center"
			p={{base: 3, sm: 16}}
		>
			{title && (
				<Flex
					w="100%"
					maxW={{ base:"100%", md:"75%", lg: "60%" }}
					mb={5}
					alignItems="center"
				>
					<Heading
						display="inline-block"
						size="lg"
						color="primary.500"
						mt={25}
					>
						{title.text}
					</Heading>
					{title.helper}
				</Flex>
			)}
			<Card
				w="100%"
				maxW={{ base:"100%", md:"75%", lg:"60%" }}
				p={{ base: isTable ? 0 : 6, sm: isTable ? 6 : 16 }}
				borderRadius={12}
				boxShadow={isTable ? 0 : "lg"}
				bg="white"
			>
				<Stack w="100%" spacing={8}>
					{children}
				</Stack>
			</Card>

			{button}
		</Flex>
	);
};
