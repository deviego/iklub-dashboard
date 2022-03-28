import React from "react";
import { Box, Stack, Text, Button } from "@chakra-ui/react";

export interface IUserInfoCardProps {
	label: string;
	value: string | string[] | null;
}

export const DetailsRow: React.FC<IUserInfoCardProps> = (props) => {
	const { value, label } = props;
	return (
		<Box w="100%" >
			{!Array.isArray(value) ?
				(
					<Stack spacing={1}>
						<Text fontSize="md" fontWeight="bold">{label}</Text>
						<Text
							fontSize="md"
							bg="gray.100"
							color="gray.500"
							p={4}
							borderRadius="lg"
						>
							{value}
						</Text>
					</Stack>
				) : (
					<Stack spacing={1}>
						<Text fontSize="md" fontWeight="bold">{label}</Text>
						<Box>
							{Array.isArray(value) && value.map((name) => (
								<Button
									m={1}
									fontWeight="initial"
									key={name}
									cursor="initial"
								>
									{name}
								</Button>
							))}
						</Box>
					</Stack>
				)}
		</Box>
	);
};
