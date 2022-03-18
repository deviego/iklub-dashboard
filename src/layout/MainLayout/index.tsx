import React from "react";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../../layout/Navbar";
import { observer } from "mobx-react-lite";

export const MainLayout: React.FC = observer((props) => {
	const { children } = props;

	return (
		<Box minH="100vh" bg="gray.200">
			<Navbar />
			{children}
		</Box>
	);
});
