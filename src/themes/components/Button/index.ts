import { ComponentStyleConfig } from "@chakra-ui/react";
import { theme } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
	defaultProps: {
		variant: "solid",
		colorScheme: "primary",
	},
	variants: {
		solid: (props) => ({
			...theme.components.Button.variants.solid(props),
			textColor: "white",
		}),
		outline: (props) => ({
			...theme.components.Button.variants.outline(props),
			borderWidth: "1px",
		}),
	},
	sizes: {
		lg: {
			minW: { base: "100%", md: 280 },
			m: 10,
		},
	},
};


// 	lg: (props) => ({
// 		...theme.components.Button.sizes.lg(props),
// 		margin: 10,
// 		minW: { base: "100%", md: 280 },
// 	}),
// },
