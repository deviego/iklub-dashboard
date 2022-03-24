import React from "react";
import { observer } from "mobx-react-lite";
import {
	Flex,
	Button,
	VStack,
	useToast,
} from "@chakra-ui/react";
import {
	Card,
	TextInput,
	Logo,
} from "~/components";
import strings from "~/resources/strings";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import { useHistory, useParams } from "react-router-dom";

const Recovery: React.FC = () => {
	const [hasToken, setHasToken] = React.useState(false);

	const toast = useToast();
	const { token } = useParams<{ token: string }>();
	const { authStore } = useGlobalStore();
	const history = useHistory();
	const pageStrings = strings.recoveryPage;
	const commonStrings = strings.common;

	React.useEffect(() => {
		if (token && !authStore.receivedToken) {
			authStore.validateTokenUrl(
				() => { },
				() => history.push("/recovery"),
				token,
			);
		}
	}, []);

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
				maxW={{ base: "100vw", sm: "28rem" }}
				minH={{ base: "100vh", sm: "30rem" }}
				rounded={{ base: 0, sm: 10 }}
				w="100%"
				bgColor="white"
			>
				<VStack spacing={8} w="100%">
					<Logo />
					{authStore.receivedToken && authStore.receivedToken.length > 0 ? (
						<>
							<TextInput
								type="password"
								labelText={strings.recoveryPage.newPassword}
								isDisabled={authStore.loader.isLoading}
								{...authStore.form.field("newPassword")}
							/>
							<TextInput
								type="password"
								labelText={strings.recoveryPage.confirmNewPassword}
								isDisabled={authStore.loader.isLoading}
								{...authStore.form.field("confirmNewPassword")}
							/>
							<Button
								onClick={() => {
									setHasToken(!hasToken);
									authStore.resetPassword(() => {
										toast({ status: "success", title: pageStrings.success });
										history.push("/dashboard");
									},
									(errorMessage: string) => toast({ status: "error", title: errorMessage }),
									);
								}}
							>
								{pageStrings.newPasswordButton}
							</Button>

						</>
					) : (
						<>
							{hasToken ? (
								<TextInput
									key={authStore.form.field("token").name}
									type="text"
									labelText={pageStrings.token}
									isDisabled={authStore.loader.isLoading}
									{...authStore.form.field("token")}
								/>
							) : (
								<TextInput
									key={authStore.form.field("email").name}
									type="email"
									labelText={pageStrings.email}
									isDisabled={authStore.loader.isLoading}
									{...authStore.form.field("email")}
								/>
							)}
							<Button
								onClick={() => {
									if (hasToken) {
										authStore.validateToken(() => {
											history.push(
												`/recovery/${authStore.receivedToken}`,
											);
										},
										(errorMessage: string) => toast({ status: "error", title: errorMessage }),
										);
									} else {
										authStore.sendNewPassword(() => {
											history.push("/recovery");
											setHasToken(!hasToken);
										},
										(errorMessage: string) => toast({ status: "error", title: errorMessage }),
										);
									}
								}}
							>
								{hasToken
									? pageStrings.confirmTokenButton
									: pageStrings.recoverPasswordButton}
							</Button>
							<Button
								variant="link"
								colorScheme="primary"
								onClick={() => {
									setHasToken(!hasToken);
									authStore.form.fieldError.clearErrors();
								}}
							>
								{hasToken
									? pageStrings.noTokenButton
									: pageStrings.tokenButton}
							</Button>
							<Button
								variant="link"
								colorScheme="primary"
								onClick={() => history.push("/login")}
							>
								{commonStrings.buttons.backButton}
							</Button>
						</>
					)}
				</VStack>
			</Card>
		</Flex>
	);
};

export default observer(Recovery);
