import React from "react";
import { observer } from "mobx-react-lite";

import { theme } from "../themes";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import { Auth } from "./Auth";
import { GlobalStoreProvider } from "~/contexts/useGlobalContext";
import Recovery from "./Recovery";

const App = observer(() => (
	<ChakraProvider theme={theme}>
		<GlobalStoreProvider>
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						component={Auth}
					/>
					<Route path="/login" component={Login} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/recovery" component={Recovery} />
				</Switch>
			</BrowserRouter>
		</GlobalStoreProvider>
	</ChakraProvider>
));

export default App;
