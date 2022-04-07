import * as React from "react";
import { Button } from "@chakra-ui/react";

interface IProps {
	isLoading: boolean;
	action: React.MouseEventHandler<HTMLButtonElement>;
	value: string;
	variant?: string;
}

export const ButtonActions: React.FC<IProps> = (props) => {
	const { isLoading, action, value, variant } = props;

	return (
		<>
			<Button
				variant={variant}
				minW={{ base: "100%", md: 280 }}
				size="lg"
				mt={10}
				isLoading={isLoading}
				onClick={action}
			>
				{value}
			</Button>
		</>
	);
};
