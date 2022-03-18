import React from "react";
import { observer } from "mobx-react-lite";

import { theme } from "../themes";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import { GlobalStoreProvider } from "~/contexts/useGlobalContext";


const App = observer(() => (
	<ChakraProvider theme={theme}>
		<GlobalStoreProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/dashboard" component={Dashboard} />
				</Switch>
			</BrowserRouter>
		</GlobalStoreProvider>
	</ChakraProvider>
));

export default App;
