import React from "react";
import {observer, useLocalObservable} from "mobx-react-lite";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalBody,
	ModalHeader,
	Flex,
	Button,
	ModalFooter,
	HStack,
} from "@chakra-ui/react";
import {
	CentralizedCard,
	LabelWithText,
	Loading,
	MoneyInput,
} from "~/components";
import strings from "~/resources/strings";
import Store from "./store";
import { useGlobalStore } from "~/contexts/useGlobalContext";
import { useHistory } from "react-router-dom";
import { BankAccountDetails } from "./components/BankAccountDetails";
import format from "~/resources/format";
import { showErrorToast } from "~/resources/toast";

const Wallet: React.FC = () => {
	const pageStrings = strings.wallet;

	const { authStore } = useGlobalStore();

	const history = useHistory();

	const store = useLocalObservable(() => new Store(history.goBack));

	const onGoToEditBankAccount = (adminRestaurantId: string) => history.push(`/dashboard/restaurant/restaurantProfile/${adminRestaurantId}`);
	const [isOpen, setIsOpen] = React.useState(false);

	const onOpen = () => {
		setIsOpen(true);
	};

	const onClose = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				closeOnOverlayClick
				isCentered
			>
				<ModalOverlay />
				<ModalContent
					w={{base: "100vw"}}
					maxH="95%"
					overflowY="auto"
				>
					<ModalHeader
						p={5}
						color="primary.500"
					>
						{pageStrings.modalHeader}
					</ModalHeader>
					<ModalBody
						color="primary.500"
						px={2}
						borderTopColor="primary.500"
						borderWidth={1}
					>
						<MoneyInput
							value={store.withdrawAmount.value.toString()}
							onChange={(value: string) => store.withdrawAmount.setValue(parseInt(value))}
						/>
					</ModalBody>
					<ModalFooter borderTopColor="primary.500" borderWidth={1}>
						<HStack
							mt={8}
							spacing={5}
						>
							<Button
								variant="outline"
								onClick={onClose}
							>
								{strings.common.cancel}
							</Button>
							<Button
								variant="outline"
								bgColor="primary.500"
								color="whiteAlpha.900"
								onClick={() => store.withdrawEarnings()}
							>
								{strings.common.confirm}
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{
				!store.balance.value ? (
					<Loading />
				) : (
					<CentralizedCard
						title={{
							text: pageStrings.title,
						}}
						button={(
							<Button
								variant="outline"
								minW={{ base: "100%", md: 280 }}
								size="lg"
								mt={10}
								onClick={() => store.balance.value ? onOpen() : showErrorToast(pageStrings.withdrawError)}
							>
								{pageStrings.withdrawButton}
							</Button>
						)}
					>
						<Flex
							flexDir={{ base: "column", md: "row" }}
							justifyContent="space-around"
							alignItems="center"
							p={5}
						>
							<LabelWithText
								label={pageStrings.transferred}
								text={format.currencyForBR(store.balance.value.transferred)}
								marginLabel={1}
							/>
							<LabelWithText
								label={pageStrings.pending}
								text={format.currencyForBR(store.balance.value.waiting)}
								marginLabel={1}
							/>
							<LabelWithText
								label={pageStrings.available}
								text={format.currencyForBR(store.balance.value.available)}
								marginLabel={1}
							/>
						</Flex>
					</CentralizedCard>
				)
			}
			{
				(store.bankAccount.value && authStore.currentAdminUser?.id) &&
					<BankAccountDetails
						title={pageStrings.bankAccountTitle}
						bankAccount={store.bankAccount.value}
						onGoToEditRestaurant={() => onGoToEditBankAccount(authStore.currentAdminUser?.id || "")}
					/>
			}
		</>
	);
};

export default observer(Wallet);
