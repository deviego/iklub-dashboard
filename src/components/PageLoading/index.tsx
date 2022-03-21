import React from "react";
import { Flex, CircularProgress } from "@chakra-ui/react";

interface IProps {
	loading: boolean;
}

export const PageLoading: React.FC<IProps> = (props) => {
	const { children, loading } = props;
	return (
		<Flex justifyContent="center">
			{loading
				? <CircularProgress size="120px" color="primary.500" isIndeterminate />
				: (
					children
				)}
		</Flex>
	);
};
