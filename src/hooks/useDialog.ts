import React from "react";
import { IDialogProps } from "../components";

export interface IDialog {
	dialogProps: IDialogProps;
	closeDialog: () => void;
	showDialog: (props: Partial<IDialogProps>) => void;
	isOpen: boolean;
}

export const useDialog = (): IDialog => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [dialogProps, setDialogProps] = React.useState<IDialogProps>({
		isOpen,
		onClose: () => setIsOpen(false),
	});

	const closeDialog = () => {
		setIsOpen(false);
	};

	const showDialog = (props: Partial<IDialogProps>) => {
		setDialogProps({ ...props, onClose: () => closeDialog(), isOpen });
		setIsOpen(true);
	};

	return {
		dialogProps,
		closeDialog,
		showDialog,
		isOpen,
	};
};
