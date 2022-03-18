import { ComponentStyleConfig } from "@chakra-ui/react";

export const Switch: ComponentStyleConfig = {
	baseStyle: {
		track: {
			bg:"primary.500",
			_checked: {
				bg: "red.500",
			},
		},
	},
};
