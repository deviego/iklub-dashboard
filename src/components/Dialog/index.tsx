import React from "react";
import { observer } from "mobx-react-lite";

import {
	ModalHeader,
	Button,
	ButtonProps,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
} from "@chakra-ui/react";

export interface IProps  {
	isOpen: boolean;
	ref?: React.MutableRefObject<undefined>;
	title?: string;
	closeOnOverlayClick?: boolean;
	description?: string;
	onClose: () => void;
	buttons?: Array<{
		title: string;
		onPress: () => void;
		buttonProps?: ButtonProps;
		outlined?: boolean;
	}>;
}

export const Dialog: React.FC<IProps> = observer((props) => {
	const {
		onClose,
		isOpen,
		description,
		title,
		buttons,
		closeOnOverlayClick,
	} = props;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={closeOnOverlayClick}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="primary.500">{title}</ModalHeader>
				<ModalBody color="secondary.500">
					{description}
				</ModalBody>

				<ModalFooter>
					{buttons && (
						buttons.map((button) => (
							button.outlined ? (
								<Button
									variant="outline"
									colorScheme="primary"
									fontSize={{ base: "sm", sm: "md" }}
									key={button.title}
									mx={{ base: 2, md: 10 }}
									onClick={button.onPress}
									{...button.buttonProps}
								>
									{button.title}
								</Button>

							) : (

								<Button
									color="white"
									key={button.title}
									fontSize={{ base: "sm", sm: "md" }}
									colorScheme="primary"
									mx={{ base: 2, md: 10 }}
									onClick={button.onPress}
									{...button.buttonProps}
								>
									{button.title}
								</Button>
							)
						))
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

});

