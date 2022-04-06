import React from "react";
import { observer } from "mobx-react-lite";
import { Text, Box, Icon, Link, Image, Flex } from "@chakra-ui/react";
import strings from "../../../resources/strings";
import useMainRoutes from "../../../hooks/useMainRoutes";
import { useGlobalStore } from "../../../contexts/useGlobalContext";
import { AiOutlineLogout } from "react-icons/ai";
import { useHistory, Link as RouterLink } from "react-router-dom";

interface IProps {
	onClose: () => void;
}

export const DrawerLinks: React.FC<IProps> = observer((props) => {

	const { onClose } = props;
	const { authStore } = useGlobalStore();
	const routes = useMainRoutes(authStore.currentAdminUser);
	const fontSizeBreakPoint = { base: "sm", lg: "md" };
	const history = useHistory();

	const onSuccess = () => (
		history.push("/login")
	);

	return (
		<>
			<Box
				alignItems="flex-start"
				justifyContent="center"
				mt={8}
				display="flex"
				flexDirection="column"
			>
				<Image
					mb="6"
					src="/logo_m.svg"
					w="90%"
					p={5}
				/>
				{routes.map((mainLink) => (
					mainLink &&
						<Link
							as={RouterLink}
							key={mainLink.text}
							to={mainLink.path}
							onClick={onClose}
							display="flex"
							_hover={{
								textDecoration: "none",
							}}
							justifyContent="center"
							alignItems="center"
							mb={4}
						>
							<Icon
								as={mainLink.Icon}
								cursor="pointer"
								color="secondary.500"
								h={8}
								mr={2}
								w={8}
							/>
							<Text
								color="primary.500"
								fontSize={fontSizeBreakPoint}
								fontWeight="bold"
							>
								{mainLink.text}
							</Text>
						</Link>
				))}
				<Flex
					justifyContent="center"
					alignItems="center"
					onClick={() => authStore.logout(onSuccess)}
					mb={4}
				>
					<Icon
						as={AiOutlineLogout}
						cursor="pointer"
						color="secondary.500"
						h={8}
						mr={2}
						w={8}
					/>
					<Text
						color="primary.500"
						fontSize={fontSizeBreakPoint}
						fontWeight="bold"
						cursor="pointer"
					>
						{strings.nav?.logout}
					</Text>

				</Flex>
			</Box>
		</>
	);
});
