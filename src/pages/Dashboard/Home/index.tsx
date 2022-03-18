import React from "react";
import { observer } from "mobx-react-lite";
import {
	Flex,
} from "@chakra-ui/react";

const Home: React.FC = () => (
	<Flex>
		Aqui é a home
	</Flex>
);

export default observer(Home);
