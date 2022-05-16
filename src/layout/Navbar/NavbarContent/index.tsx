import React from "react";
import { observer } from "mobx-react-lite";
import { Icon, Flex, Image } from "@chakra-ui/react";
import { DrawerContainer, DrawerProfile } from "../../../components";
import { AiOutlineMenu } from "react-icons/ai";

export const NavbarContent: React.FC = observer(() => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [isOpenProfile, setIsOpenProfile] = React.useState<boolean>(false);

	return (
		<>
			<Flex
				width="100%"
				alignItems="center"
				justifyContent="space-between"
				maxW={{ base: "100%", md: "72%" }}
			>
				<Icon
					as={AiOutlineMenu}
					onClick={() => setIsOpen(true)}
					cursor="pointer"
					color="primary.500"
					w={35}
					h={35}
				/>
				<Image
					alt="logo"
					src="/logo_squared.svg"
					h={{ base: "2.5rem", sm: "3.5rem" }}
				/>
			</Flex>
			<DrawerProfile
				isOpen={isOpenProfile}
				onClose={() => setIsOpenProfile(false)}
			/>
			<DrawerContainer
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</>
	);
});
