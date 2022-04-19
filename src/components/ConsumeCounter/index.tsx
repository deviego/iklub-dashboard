import React from "react";
import { observer } from "mobx-react-lite";
import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Text,
} from "@chakra-ui/react";
import strings from "~/resources/strings";

interface IProps {
	isOpen: boolean;
	onChangeIsOpen: (newStatus: boolean) => void;
	quantity: number;
	onChangeQuantity: (newQuantity: number) => void;
	availableDoses: number;
	onConfirm: () => void;
}

export const ConsumeCounter: React.FC<IProps> = observer((props) => {
	const { isOpen, quantity, availableDoses, onChangeIsOpen, onChangeQuantity, onConfirm } = props;
	const componentStrings = strings.components.consumeCounter;

	const closeModal = () => onChangeIsOpen(false);

	const onPressConfirm = () => {
		onConfirm();
		closeModal();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={closeModal}
		>
			<ModalOverlay />
			<ModalContent p={3}>
				<ModalHeader justifyContent="center">
					<Text fontSize="xl" textAlign="center">
						{componentStrings.title}
					</Text>
				</ModalHeader>
				<ModalBody
					w="60%"
					mx="auto"
					justifyContent="center"
					mb={-5}
				>
					<NumberInput
						defaultValue={1}
						min={1}
						max={availableDoses}
						value={quantity}
						onChange={(value) => onChangeQuantity(parseInt(value))}
						color="primary.800"
						bgColor="gray.100"
						mb={5}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</ModalBody>
				<ModalFooter bgColor="white">
					<Flex
						mx="auto"
						flexDirection="row"
						alignItems="center"
						justifyContent="space-evenly"
						w="80%"
					>
						<Button onClick={closeModal} variant="outline" w="40%">
							{strings.actions.cancel}
						</Button>
						<Button onClick={onPressConfirm} w="40%">
							{strings.actions.send}
						</Button>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal >
	);
});
