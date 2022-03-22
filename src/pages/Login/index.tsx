import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Button, VStack, useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import {
	Card,
	TextInput,
	Logo,
} from "~/components";
import strings from "~/resources/strings";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import { useAuthRoute } from "~/hooks/useAuthRoute";

const Login: React.FC = () => {
	const pageStrings = strings.login;
	const toast = useToast();
	const { authStore } = useGlobalStore();
	const history = useHistory();

	const onSuccess = (userName: string) => {
		toast({status: "success", title: pageStrings.success(userName)});
		history.replace("/");
	};

	const onError = (errorMessage: string) => {
		toast({status: "error", title: errorMessage});
	};

	const login = () => {
		authStore.login(onSuccess, onError);
	};

	const toRecovery = () => {
		history.push("/recovery");
	};

	useAuthRoute(() => history.push("/dashboard"));

	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			w="100%"
			minH="100vh"
			bg="gray.200"
		>
			<Card
				d="flex"
				alignItems="center"
				maxW={{ base:"100vw", sm: "28rem" }}
				minH={{ base: "100vh", sm: "30rem" }}
				rounded={{ base: 0, sm: 10 }}
				w="100%"
				bgColor="white"
			>
				<VStack spacing="8" w="100%">
					<Logo />
					<TextInput
						labelText={pageStrings.fields.email}
						type="email"
						isDisabled={authStore.loader.isLoading}
						{...authStore.form.field("email")}
						bgColor="gray.100"
						minWidth={{ base: 250, sm: 300 }}
					/>
					<TextInput
						labelText={pageStrings.fields.password}
						type="password"
						isDisabled={authStore.loader.isLoading}
						{...authStore.form.field("password")}
						bgColor="gray.100"
						minWidth={{ base: 250, sm: 300 }}
					/>
					<Button
						w="12rem"
						onClick={login}
						rounded="xl"
						isLoading={authStore.loader.isLoading}
					>
						{pageStrings.loginIn}
					</Button>
					<Button
						colorScheme="primary"
						variant="link"
						onClick={toRecovery}
					>
						{pageStrings.recoveryPassword}
					</Button>
				</VStack>
			</Card>
		</Flex>
	);
};

export default observer(Login);
