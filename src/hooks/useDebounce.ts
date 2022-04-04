import React from "react";

export const useDebounce = () => {
	const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

	const clearTimer = () => {
		if (timer !== null){
			clearTimeout(timer);
		}
	};

	return {
		setTimer,
		clearTimer,
	};
};
