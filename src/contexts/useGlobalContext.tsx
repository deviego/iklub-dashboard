import React from "react";
import { useLocalObservable, observer } from "mobx-react-lite";
import AuthStore from "../stores/AuthStore";
import { IDialog, useDialog } from "~/hooks/useDialog";
import { Dialog } from "~/components";

interface IGlobalStore {
	authStore: AuthStore;
	dialog: IDialog;
}

const GlobalStoreContext = React.createContext<IGlobalStore | null>(null);

export const GlobalStoreProvider = observer((props) => {
	const authStore = useLocalObservable(() => new AuthStore());
	const dialog = useDialog();

	return (
		<GlobalStoreContext.Provider value={{authStore, dialog }}>
			<Dialog {...dialog.dialogProps} isOpen={dialog.isOpen} />
			{props.children}
		</GlobalStoreContext.Provider>
	);
});

export const useGlobalStore = () => {
	const store = React.useContext(GlobalStoreContext);
	if (!store) {
		throw new Error("Cannot Access Store outside it's context");
	}
	return store;
};
