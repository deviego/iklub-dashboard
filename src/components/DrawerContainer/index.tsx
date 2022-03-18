import React from "react";
import {
	Drawer,
	DrawerOverlay,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
} from "@chakra-ui/react";
import { DrawerLinks } from "./DrawerLinks";

interface IProps {
	isOpen: boolean;
	onClose: () => void;
}

export const DrawerContainer: React.FC<IProps> = (props) => {
	const { isOpen, onClose } = props;
	return (
		<Drawer
			placement="left"
			isOpen={isOpen}
			onClose={onClose}
		>
			<DrawerOverlay />
			<DrawerContent onClose={onClose} >
				<DrawerCloseButton />
				<DrawerBody>
					<DrawerLinks onClose={onClose} />
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
