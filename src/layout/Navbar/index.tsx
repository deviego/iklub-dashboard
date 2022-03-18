import React from "react";
import { Box } from "@chakra-ui/react";

import { NavbarContent } from "./NavbarContent";

export const Navbar: React.FC = () => (
	<Box
		px={{base: "20px" , lg: "30px"}}
		py="10px"
		display="flex"
		justifyContent="center"
		bg="white"
	>
		<NavbarContent />
	</Box>
);
