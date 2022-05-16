import React from "react";
import {
	Flex,
	Text,
	TextProps,
} from "@chakra-ui/react";

import { Label } from "~/components";

interface IProps extends TextProps {
	helper?: string;
	marginLabel?: number;
	label: string;
	text: string;
}
export const LabelWithText: React.FC<IProps> = (props) => {

	const {
		helper,
		label,
		text,
		marginLabel,
	} = props;

	return (
		<Flex flexDirection="column">
			<Flex flexDirection="row">
				<Label
					fontWeight="bold"
					mb={marginLabel ? marginLabel : 3}
				>
					{label}
				</Label>
				{helper && (
					<Text
						ml={1}
						mb={3}
						color="gray.600"
						size="xs"
						alignSelf="center"
						variant="secondary"
					>
						{helper}
					</Text>
				)}
			</Flex>
			<Text
				display="flex"
				color="gray.500"
				fontSize="md"
				textAlign="justify"
				{...props}
			>
				{text}

			</Text>
		</Flex>
	);
};
