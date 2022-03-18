import { createStandaloneToast } from "@chakra-ui/react";
import { theme } from "~/themes";

export const showSuccessToast = (message: string, title?: string) => {
	const toast = createStandaloneToast({ theme });

	toast({
		title,
		description: message,
		status: "success",
		duration: 2000,
		isClosable: true,
	});
};

export const showErrorToast = (message: string, title?: string) => {
	const toast = createStandaloneToast({ theme });

	toast({
		title,
		description: message,
		status: "error",
		duration: 2000,
		isClosable: true,
	});
};

export const showInfoToast = (message: string, title?: string) => {
	const toast = createStandaloneToast({ theme });

	toast({
		title,
		description: message,
		status: "info",
		duration: 2000,
		isClosable: true,
	});
};
