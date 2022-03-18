import React from "react";
import { useLocalObservable, observer } from "mobx-react-lite";
import AuthStore from "../stores/AuthStore";

interface IGlobalStore {
	authStore: AuthStore;
	// dialog: IDialog;
}

const GlobalStoreContext = React.createContext<IGlobalStore | null>(null);
const authStore = useLocalObservable(() => new AuthStore());

export const GlobalStoreProvider = observer((props) => (
	<GlobalStoreContext.Provider value={{ authStore }}>
		{props.children}
	</GlobalStoreContext.Provider>
));

export const useGlobalStore = () => {
	const store = React.useContext(GlobalStoreContext);
	if (!store) {
		throw new Error("Cannot Access Store outside it's context");
	}
	return store;
};
