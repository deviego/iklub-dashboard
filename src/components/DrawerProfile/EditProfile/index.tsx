import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Button, Stack } from "@chakra-ui/react";
import {
	ImagePicker,
	PageLoading,
	TextInput,
} from "../..";
import strings from "../../../resources/strings";
import { useGlobalStore } from "../../../contexts/useGlobalContext";

interface IProps {
	onClose: () => void;
}

const EditProfile: React.FC<IProps> = () => {
	const commonStrings = strings.common.fields;
	// const { onClose } = props;
	// const toast = useToast();
	const { authStore } = useGlobalStore();

	// const onSuccess = () => {
	// 	toast({ status: "success", title: componentStrings.success });
	// 	onClose();
	// };

	// const onError = (errorMessage: string) => {
	// 	toast({status: "error", title: errorMessage});
	// };

	// const editAdminUser = () => {
	// 	if (authStore.currentAdminUser?.id) {
	// 		authStore.editAdminUser(authStore.currentAdminUser?.id, {onSuccess, onError});
	// 	}
	// };

	return (
		<PageLoading loading={authStore.loader.isLoading}>
			<Flex
				justifyContent="center"
				alignItems="center"
				w="100%"
				p={{base: 0, sm: 16 }}
			>
				<Stack w="100%" spacing={8}>
					<Flex flexDir="column" alignItems="center">
						<ImagePicker
							pickImage={authStore.profileImage.getPickerFields().pick}
							src={authStore.profileImage.src}
						/>
					</Flex>
					<TextInput
						labelText={commonStrings.name}
						type="text"
						isDisabled={authStore.loader.isLoading}
						{...authStore.formProfile.field("name")}
					/>
					<TextInput
						labelText={commonStrings.email}
						type="email"
						isDisabled={authStore.loader.isLoading}
						{...authStore.formProfile.field("email")}
					/>
					<Button
						// onClick={editAdminUser}
						variant="larger"
						colorScheme="primary"
						isLoading={authStore.loader.isLoading}
					>
						{strings.common.editTitle}
					</Button>
				</Stack>
			</Flex>
		</PageLoading>
	);
};

export default observer(EditProfile);
