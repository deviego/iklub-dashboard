import React from "react";
import {
	Drawer,
	DrawerOverlay,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
} from "@chakra-ui/react";
import EditProfile from "./EditProfile";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

export const DrawerProfile: React.FC<IProps> = (props) => {
	const { isOpen, onClose } = props;
	return (
		<Drawer
			placement="right"
			size="md"
			isOpen={isOpen}
			onClose={onClose}
		>
			<DrawerOverlay />
			<DrawerContent onClose={onClose} >
				<DrawerCloseButton />
				<DrawerBody>
					<EditProfile onClose={onClose} />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
