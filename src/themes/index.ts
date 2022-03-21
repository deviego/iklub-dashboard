import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { fontSizes } from "./fontSizes";
import { components } from "./components";

export const theme = extendTheme(
	{
		colors,
		fontSizes,
		components,
	},
);
