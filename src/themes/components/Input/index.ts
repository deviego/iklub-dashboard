import { ComponentStyleConfig } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

export const Input: ComponentStyleConfig = {
	defaultProps: {
		variant: "solid",
	},
	variants: {
		solid: (props) => ({
			...theme.components.Button.variants.solid(props),
			field: {
				color: "primary.800",
				bg: "gray.100",
				_hover: {
					bg: "gray.200",
				},
			},
		}),
	},
};
