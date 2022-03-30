import React from "react";
import { observer } from "mobx-react-lite";

import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalFooter,
	ModalBody,
	ModalHeader,
	Flex,
} from "@chakra-ui/react";

import strings from "~/resources/strings";

import { List, IProps as IListProps } from "./List";

interface IProps<DataType>{
	isOpen: boolean;
	closeOnOverlayClick?: boolean;
	listProps: IListProps<DataType>;
	header?: React.ReactElement;
	onClose: () => void;
}

export const AutoCompleteModal = observer(<DataType,>(props: IProps<DataType>) => {
	const {
		onClose,
		isOpen,
		header,
		listProps,
		closeOnOverlayClick = true,
	} = props;

	const componentStrings = strings.components.autoCompleteModal;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnOverlayClick={closeOnOverlayClick}
			isCentered
		>
			<ModalOverlay />
			<ModalContent
				w={{base: "100vw"}}
				maxH="95%"
				overflowY="auto"
			>
				<ModalHeader
					px={2}
					py={0}
				>
					{header}
				</ModalHeader>
				<ModalBody
					color="primary.500"
					px={2}
					borderTopColor="primary.500"
					borderWidth={1}
				>
					<List {...listProps} />
				</ModalBody>

				<ModalFooter borderTopColor="primary.500" borderWidth={1}>
					<Flex flexDir="column" justifyContent="center">
						<Button
							mt={8}
							variant="link"
							onClick={onClose}
						>
							{componentStrings.back}
						</Button>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);

});
