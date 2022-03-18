import React from "react";
import {
	Flex,
	Text,
	TextProps,
} from "@chakra-ui/react";

interface IProps extends TextProps{
	helper?: string;
}
export const Label: React.FC<IProps> = (props) => {

	const {
		children,
		helper,
	} = props;

	return (
		<Flex>
			<Text
				display="flex"
				variant="secondary"
				{...props}
			>
				{children}

			</Text>
			{helper && (
				<Text
					ml={1}
					size="xs"
					alignSelf="center"
					variant="secondary"
				>
					{helper}
				</Text>
			)}
		</Flex>
	);
};
